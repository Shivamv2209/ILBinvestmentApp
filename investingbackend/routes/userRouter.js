import express from 'express';
import { signup,login } from '../controllers/userController.js';

const userrouter = express.Router();

userrouter.post("/signup", signup);

userrouter.post("/login", login);

export default userrouter;