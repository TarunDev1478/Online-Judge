import express from 'express';
import cors from 'cors';
import z from 'zod';
import { authenticateUserJwt } from '../../middleware/authentication.js';
import { Problem } from '../../db/db.js';
import fetch from 'node-fetch';


const solveProblem = express.Router();

solveProblem.use(cors());

var testcases=[];




const codeInput = z.object({
    language: z.string(),
    code: z.string(),
    input: z.string(),
});


const codesubmitInput = z.object({
    language: z.string(),
    code: z.string(),
});
const getTestcases = async (problem_id) => {
    try {
        const problem = await Problem.findById(problem_id);
        if (!problem) {
            throw new Error('Problem not found');
        }
      
        testcases=problem.testCases;
    } catch (error) {
        console.error('Error in getTestcases:', error.message);
        throw error;
    }
};

const getOutput = async (language, code, problem_id, input) => {
    await getTestcases(problem_id);
    try {
        const response = await fetch(`http://13.200.229.242:5000/run`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: language,
                code: code,
                input: input,
            }),
        });

        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Received non-JSON response: ${text}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getOutput:', error.message);
        throw new Error("An error occurred while running the code");
    }
};



const getSumbitOutput = async (language, code, problem_id) => {
    await getTestcases(problem_id);
   
    try {
        const response = await fetch(`http://13.200.229.242:5000/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: language,
                code: code,
                testcases:testcases
            }),
        });

        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Received non-JSON response: ${text}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getOutput:', error.message);
        throw new Error("An error occurred while running the code");
    }
};


solveProblem.post('/solve', authenticateUserJwt, async (req, res) => {
    const parsedInput = codeInput.safeParse(req.body);
    const problem_id = req.headers.problem_id;
    if (!parsedInput.success) {
        return res.status(400).json({ error: "Wrong input" });
    }

    const { language, code, input } = req.body;

    try {
        const output = await getOutput(language, code, problem_id,input);
        res.json({
            finaloutput: output,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


solveProblem.post('/verdict', authenticateUserJwt, async (req, res) => {
    const parsedInput = codesubmitInput.safeParse(req.body);
    const problem_id = req.headers.problem_id;
    if (!parsedInput.success) {
        return res.status(400).json({ error: "Wrong input" });
    }

    const { language, code } = req.body;

    try {
        const output = await getSumbitOutput(language, code, problem_id);
        res.json({
            finaloutput: output,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default solveProblem;
