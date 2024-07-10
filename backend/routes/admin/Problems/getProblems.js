import express  from 'express';
const router = express.Router();
import { Problem } from '../../../db/db.js';

import cors from 'cors'
import { authenticateUserJwt } from '../../../middleware/authentication.js';

const getProblem = express.Router();



getProblem.get('/problems',async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching problems' });
    }
});

export default getProblem;
