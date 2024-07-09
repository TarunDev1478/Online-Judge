import  express   from "express";
import jwt from 'jsonwebtoken';
import cors from 'cors';
import {User} from '../db/db.js';
import { Admin } from "../db/db.js";
import { USERSECRET,ADMINSECRET, authenticateAdminJwt, authenticateUserJwt } from "../middleware/authentication.js";
import z from "zod";

const signinput = z.object({
    username:z.string(),
    email:z.string(),
    password:z.string()
})

const auth=express.Router();

auth.use(cors());

auth.post('/admin/signup',async (req,res)=>{
    let parsedInput =  signinput.safeParse(req.body);
    if(!parsedInput.success){
        return res.json({
            error:"Wrong input",
        })
    }
    const username = req.body.username;
    const email= req.body.email;
    const password = req.body.password;
    const admin1 = await Admin.findOne({username:req.body.username});
    const admin2 = await Admin.findOne({email:req.body.email});
    if(admin1){
        res.json({
            message:"User With this username already exist"
        })
    }
    else{
        if(admin2){
            res.json({
                message:"User With this email already exist"
            })
        }
        else{
            const newuser = new Admin({username,email,password});
            await newuser.save();
            const token=jwt.sign({id: newuser._id},ADMINSECRET, {expiresIn:'1h'});
            res.json({message:'user created successfully',token});
        }
    }
    
});

auth.post('/user/signup',async (req,res)=>{
    let parsedInput =  signinput.safeParse(req.body);
    if(!parsedInput.success){
        return res.json({
            error:"Wrong input",
        })
    }
    const username = req.body.username;
    const email= req.body.email;
    const password = req.body.password;
    const user1 = await User.findOne({username:req.body.username});
    const user2 = await User.findOne({email:req.body.email});
    if(user1){
        res.json({
            message:"User With this username already exist"
        })
    }else{
        if(user2){
            res.json({
                message:"User With this username already exist"
            })
        }
        else{
            const newuser = new User({username,email,password});
            await newuser.save();
            const token=jwt.sign({id: newuser._id},USERSECRET, {expiresIn:'1h'});
            res.json({message:'user created successfully',token});
        }
    }
   
});

auth.post('/user/login', async (req,res)=>{
    const{username,password}= req.body;
    const user = await User.findOne({username,password});
    if(user){
        const token = jwt.sign({username , role: 'user'}, USERSECRET , {expiresIn:'1h'});
        res.json({
            message:'User Logined Successfully',token
        })
    }
    else{
        res.json({
            message:"User Does not exist"
        })
    }
});


auth.post('/admin/login', async (req,res)=>{
    const{username,password}= req.body;
    const user = await Admin.findOne({username,password});
    if(user){
        const token = jwt.sign({username , role: 'admin'}, ADMINSECRET , {expiresIn:'1h'});
        res.json({
            message:'Admin Logined Successfully',token
        })
    }
    else{
        res.json({
            message:"Admin Does not exist"
        })
    }
});

auth.get('/admin/me', authenticateAdminJwt, (req, res) => {
    const username = req.user.username;
    const id=req.user._id;
    console.log(id);
    if (!username) {
        return res.status(404).json({ error: 'Username not found' });
    }
    res.status(200).json({ username: username});
});

auth.get('/user/me', authenticateUserJwt, (req, res) => {
    const username = req.user.username;
    const id=req.user._id;
    if (!username) {
        return res.status(404).json({ error: 'Username not found' });
    }
    res.status(200).json({ username: username });
});

export default auth;