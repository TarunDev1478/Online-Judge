import express from 'express';
import cors from 'cors';
import { Admin, Problem } from '../../../db/db.js';
import { authenticateAdminJwt } from '../../../middleware/authentication.js';
import z from 'zod';

const testCaseSchema = z.object({
    input: z.string(),
    expectedOutput: z.string(),
    description: z.string().optional()
});

const problemInput = z.object({
    problem_no: z.number(),
    title: z.string(),
    description: z.string(),
    creator: z.string(),
    time_constraint: z.string(),
    testCases: z.array(testCaseSchema),
    distestCases:z.array(testCaseSchema),
    level:z.string()
});

const addProblem = express.Router();


addProblem.post('/addProblem', authenticateAdminJwt, async (req, res) => {
    const parsedInput = problemInput.safeParse(req.body);
    if (!parsedInput.success) {
        console.error("Validation failed:", parsedInput.error);
        return res.status(400).json({ error: "Wrong input" });
    }

    const {problem_no, title, description, creator, time_constraint, testCases, distestCases,level } = req.body;

    try {
        const admin = await Admin.findOne({ username: creator });
        if (!admin) {
            console.error("Admin not found:", creator);
            return res.status(404).json({ error: "Admin not found" });
        }

        const newProblem = new Problem({
            problem_no,
            title,
            description,
            creator: admin._id,
            time_constraint,
            level,
            testCases,
            distestCases,
        });

        const savedProblem = await newProblem.save();

        admin.problems_created.push(savedProblem._id);
        await admin.save();

        res.status(201).json({ message: "Problem added successfully", problem: savedProblem });
    } catch (error) {
        console.error("Error occurred while adding the problem:", error);
        res.status(500).json({ error: "An error occurred while adding the problem" });
    }
});


export default addProblem;
