import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const signup = async(req, res, next)=>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    console.log(newUser)
    try{
        await newUser.save()
        res.status(201).json({message:"user created successfully"})
    }catch(error){
        next(error);
    }
   
}

export const signin = async(req,res,next) => {
    const {email, password } = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, 'User not found!'))
            const validPassword = bcryptjs.compare(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, 'wrong credentials'))
            const token = jwt.sign ({id:validUser._id}, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest} = validUser._doc;   //removing password to pass user doc to client side as response
        const expiryDate = new Date(Date.now()+ 360000)
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true, // Use only with HTTPS
            sameSite: 'None', // Allow cross-site cookies
            expires: expiryDate,
          })
          .status(200).json(rest)
    }catch(error){
        next(error)
    }
}