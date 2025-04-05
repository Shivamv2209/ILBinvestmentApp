import express from 'express';
import { signup,login,logout,getMe } from '../controllers/userController.js';

const userrouter = express.Router();

userrouter.post("/signup", signup);

userrouter.post("/login", login);

userrouter.post("/logout",logout)

userrouter.get('/me', getMe);

export default userrouter;