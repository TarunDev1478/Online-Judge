import express  from 'express';
const router = express.Router();
import { Problem } from '../../../db/db.js';

import cors from 'cors'
import { authenticateUserJwt } from '../../../middleware/authentication.js';

const OneProblem = express.Router();

OneProblem.use(cors());

OneProblem.get('/getProblem',authenticateUserJwt ,async (req, res) => {
    const id=req.headers.problem_id;
    try {
        const problems = await Problem.find({_id:id});
        if (!problems) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching problems' });
    }
});

export default OneProblem;