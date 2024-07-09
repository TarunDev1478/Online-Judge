import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDirectory = path.join(__dirname, "outputs");

if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
}

const executeCodesubmit = (filepath, testCases = [], timeLimit = 2000) => {
    return new Promise((resolve, reject) => {
        const jobId = path.basename(filepath).split(".")[0];
        const executablePath = path.join(outputDirectory, `${jobId}.exe`);
        const errorFilePath = path.join(outputDirectory, `${jobId}_error.txt`);

        // Compile
        exec(`g++ ${filepath} -o ${executablePath} 2> ${errorFilePath}`, (compileError, compileStdout, compileStderr) => {
            if (compileError) {
                fs.readFile(errorFilePath, 'utf8', (readError, errorData) => {
                    if (readError) {
                        return reject({ type: 'COMPILE_ERROR', error: compileError, stderr: compileStderr });
                    }
                    return reject({ type: 'COMPILE_ERROR', error: errorData.trim() });
                });
                return;
            }

            const results = [];

            const runTestCase = (index) => {
                if (index >= testCases.length) {
                    return resolve(results);
                }

                const { input, expectedOutput } = testCases[index];
                const inputFilePath = path.join(outputDirectory, `${jobId}_input_${index}.txt`);
                const outputFilePath = path.join(outputDirectory, `${jobId}_output_${index}.txt`);

                // Process input: split by commas, spaces, or newlines, then join with newlines
                const safeInput = String(input || '')
                    .split(/[,\s]+/)
                    .filter(item => item.trim() !== '')
                    .join('\n') + '\n';

                // Write input to a file
                fs.writeFileSync(inputFilePath, safeInput);

                // Run
                exec(`${executablePath} < ${inputFilePath} > ${outputFilePath} 2>> ${errorFilePath}`, { timeout: timeLimit }, (runError, runStdout, runStderr) => {
                    if (runError) {
                        if (runError.signal === 'SIGTERM') {
                            results.push({ index, success: false, error: 'TIME_LIMIT_EXCEEDED' });
                        } else {
                            fs.readFile(errorFilePath, 'utf8', (readError, errorData) => {
                                if (readError) {
                                    results.push({ index, success: false, error: runError, stderr: runStderr });
                                } else {
                                    results.push({ index, success: false, error: errorData.trim() });
                                }
                            });
                        }
                        return runTestCase(index + 1);
                    }

                    fs.readFile(outputFilePath, 'utf8', (readError, data) => {
                        if (readError) {
                            results.push({ index, success: false, error: readError });
                        } else {
                            const output = data.trim();
                            const success = output === expectedOutput;
                            results.push({ index, success, output, expectedOutput });
                        }
                        runTestCase(index + 1);
                    });
                });
            };

            runTestCase(0);
        });
    });
};

export default executeCodesubmit;
