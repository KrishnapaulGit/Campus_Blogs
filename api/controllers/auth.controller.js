import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup = async(req,res,next)=>{

    // console.log(req.body);

    const {username,email,password} = req.body;


    if(!username || !email || !password || username === '' || email === '' || password === ''){
      next(errorHandler(400,'All fields are requires'));
    }

    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password:hashedPassword
    });


    try {
        
        await newUser.save();
        res.json('Signup Successfull');
    } catch (error) {
       next(error);
    }

}

