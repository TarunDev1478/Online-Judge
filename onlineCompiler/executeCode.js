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

const executeCode = (filepath, input = '') => {
    return new Promise((resolve, reject) => {
        const jobId = path.basename(filepath).split(".")[0];
        const executablePath = path.join(outputDirectory, `${jobId}.out`);
        const inputFilePath = path.join(outputDirectory, `${jobId}_input.txt`);
        const outputFilePath = path.join(outputDirectory, `${jobId}_output.txt`);
        const errorFilePath = path.join(outputDirectory, `${jobId}_error.txt`);

        // Process input: split by commas, spaces, or newlines, then join with newlines
        const safeInput = String(input || '')
            .split(/[,\s]+/)
            .filter(item => item.trim() !== '')
            .join('\n') + '\n';

        // Write input to a file
        fs.writeFileSync(inputFilePath, safeInput);

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

            // Run
            exec(`${executablePath} < ${inputFilePath} > ${outputFilePath} 2>> ${errorFilePath}`, (runError, runStdout, runStderr) => {
                if (runError) {
                    fs.readFile(errorFilePath, 'utf8', (readError, errorData) => {
                        if (readError) {
                            return reject({ type: 'RUNTIME_ERROR', error: runError, stderr: runStderr });
                        }
                        return reject({ type: 'RUNTIME_ERROR', error: errorData.trim() });
                    });
                    return;
                }

                // Read the output file
                fs.readFile(outputFilePath, 'utf8', (readError, data) => {
                    if (readError) {
                        return reject({ type: 'OUTPUT_READ_ERROR', error: readError });
                    }
                    resolve(data.trim());
                });
            });
        });
    });
};

export default executeCode;