import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToekn.js";
import user_model from "../models/User.js"

export const signup = async (req,res)=>{
  let {name,email,password}= req.body;
  try{
    const user = await user_model.findOne({email});
    if(user){
        return res.status(400).json({error: "User already exists"});
    }
    
    bcrypt.genSalt(10,(err,salt)=>{
       bcrypt.hash(password,salt, async (err,hash)=>{
         let user = await user_model.create({
            name,
            email,
            password: hash
         })
         let token = generateToken(user);
         res.cookie("token",token)
         res.status(201).json({message: "User registered successfully",email: user.email})
       })
    })
  }catch(err){
    console.error(err);
    res.status(500).json({error: "Server error"})
  }
}


export const login = async (req,res) =>{
    let {email,password}= req.body;
    try{
        const user = await user_model.findOne({email});
        if(!user){
            return res.status(401).json({error: "User not found"});
        }
        
        bcrypt.compare(password,user.password, (err,isMatch)=>{
            if(!isMatch){
                return res.status(401).json({error: "Invalid credentials"});
            }
            
            let token = generateToken(user);
            res.cookie("token",token)
            res.json({message: "User logged in successfully",email: user.email})
        })
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Server error"})
    }
}

export const getMe = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await user_model.findById(decoded.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const logout = (req,res) => {
    res.cookie("token","");
    res.json({message: "User logged out successfully"});
}