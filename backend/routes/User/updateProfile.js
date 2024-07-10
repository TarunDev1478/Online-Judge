import express from 'express';
import { authenticateUserJwt } from '../../middleware/authentication.js';
import { User } from '../../db/db.js';
import { Problem } from '../../db/db.js';

const uProfile = express.Router();

uProfile.post('/updateActivity', authenticateUserJwt, async (req, res) => {
    try {
      const username = req.user.username;
      console.log(username);
      const today = new Date();
      const month = today.getMonth();
      const day = today.getDate() - 1;  
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!user.activity_calendar || !Array.isArray(user.activity_calendar[month])) {
        user.activity_calendar = Array(12).fill().map(() => Array(31).fill(0));
      }
  
      user.activity_calendar[month][day] += 1;
      await user.save();
  
      res.status(200).json({ message: 'Activity updated successfully' });
    } catch (error) {
      console.error('Error updating activity:', error);
      res.status(500).json({ message: 'Error updating activity', error: error.message });
    }
  });
  
  uProfile.post('/updateSolved', authenticateUserJwt, async (req, res) => {
    try {
      const username = req.user.username;
      const { problem_id, level } = req.body;
  
      const user = await User.findOne({ username });
      const problem = await Problem.findById(problem_id);
  
    //   if (!problem || problem.solved) {
    //     return res.status(200).json({ message: 'Problem already solved or not found' });
    //   }
      user.question_solved.total += 1;
      if(level=='Hard')
      user.question_solved.hard += 1;
      if(level=='medium')
      user.question_solved.medium += 1;
      if(level=='easy')
      user.question_solved.easy += 1;
      
      problem.solved = true;
      
      await user.save();
      await problem.save();
  
      res.status(200).json({ message: 'Solved status updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating solved status', error: error.message });
    }
  });
  

  export default uProfile;
