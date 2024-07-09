import express from 'express';
import auth from './Auth/Auth.js';
import mongoose from 'mongoose';
import cors from'cors';
import getProblem from './routes/admin/Problems/getProblems.js';
import addProblem from './routes/admin/Problems/addProblem.js';
import OneProblem from './routes/admin/Problems/getOneproblem.js';
import solveProblem from './routes/User/solveProblem.js';
import getProfile from './routes/User/userProfile.js';
import uProfile from './routes/User/updateProfile.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/auth',auth);
app.use('/admin',addProblem);
app.use('/user',getProblem);
app.use('/user',OneProblem);
app.use('/user',solveProblem);
app.use('/profile',getProfile);
app.use('/update',uProfile);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect('mongodb+srv://tarunkumar147800:q6GZUkFSCs0gm5Xs@cluster0.f4ulwwh.mongodb.net/',{ dbName:"OnlineJudge"});