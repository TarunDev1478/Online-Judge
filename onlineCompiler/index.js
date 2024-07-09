import express from 'express';
import cors from 'cors';
import generatePath from './generatePath.js';
import executeCode from './executeCode.js';
import executeCodesubmit from './executeCodeSubmit.js';
import z from 'zod';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ online: 'compiler' });
});

const codeInputSchema = z.object({
    language: z.string(),
    code: z.string(),
    testcases: z.array(z.object({
        input: z.string(),
        expectedOutput: z.string(),
    })),
});

app.post('/run', async (req, res) => {
    const { language, code, input } = req.body;

    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code!" });
    }

    try {
        const filePath = await generatePath(language, code);
        const output = await executeCode(filePath, input);
        res.json({ success: true, output });
    } catch (error) {
        console.error(`Error in /run:`, error);
        let responseError = {
            success: false,
            type: error.type || 'UNKNOWN_ERROR',
            error: error.error || "An unknown error occurred"
        };
        
        if (error.type === 'COMPILE_ERROR') {
            responseError.message = "Compilation Error";
        } else if (error.type === 'RUNTIME_ERROR') {
            responseError.message = "Runtime Error";
        } else if (error.type === 'OUTPUT_READ_ERROR') {
            responseError.message = "Error reading output";
        }
        
        res.status(500).json(responseError);
    }
});

app.post('/submit', async (req, res) => {
    const parsedInput = codeInputSchema.safeParse(req.body);

    if (!parsedInput.success) {
        return res.status(400).json({ success: false, error: "Invalid input format" });
    }

    const { language, code, testcases } = req.body;

    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code!" });
    }

    try {
        const filePath = await generatePath(language, code);
        const results = await executeCodesubmit(filePath, testcases);

        const output = results.map(result => {
            if (result.success) return 'AC';
            if (result.error && result.error === 'TIME_LIMIT_EXCEEDED') return 'TLE';
            if (result.error && (result.error.includes('error') || result.error.includes('COMPILE_ERROR'))) return 'CE';
            return 'WA';
        });

        res.json({ success: true, output });
    } catch (error) {
        console.error(`Error in /submit:`, error);

        let responseError = {
            success: false,
            type: error.type || 'UNKNOWN_ERROR',
            error: error.error || "An unknown error occurred",
            message: error.error || "An unknown error occurred"
        };

        if (error.type === 'COMPILE_ERROR') {
            responseError.message = error.error; // Including the error message from the compiler
        } else if (error.type === 'RUNTIME_ERROR') {
            responseError.message = "Runtime Error";
        } else if (error.type === 'OUTPUT_READ_ERROR') {
            responseError.message = "Error reading output";
        }

        res.status(500).json(responseError);
    }
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000!");
});
