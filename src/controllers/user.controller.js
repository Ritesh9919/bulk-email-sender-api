import {User} from '../models/user.model.js';
import {ApiError, ApiResponse} from '../utils/index.js';
import {sendEmailJob} from '../utils/sendEmail.js'

export const register = async(req, res, next)=> {
    try {
        const {name, email} = req.body;
        if(!name || !email) {
            return next(new ApiError("name and email is required", 400));
        }
        const user = await User.findOne({email});
        if(user) {
            return next(new ApiError("user already registered", 409));
        }

        const registerUser = await User.create({name, email});
        return res.status(201).json(new ApiResponse(true, "user registred", registerUser));
    } catch (error) {
        console.error("error while registering user", error.message);
        return next(error);
    }
}


export const sendMailJob = async(req, res, next)=> {
    try {
        const {subject} = req.body;
        const users = await User.find({});
         users.forEach((user)=> {
            sendEmailJob.add({email:user.email, subject, name:user.name});
         })
         return res.status(201).json(new ApiResponse(true, "Bulk email sending initiated"));
    } catch (error) {
        console.error("error sending email", error);
        return next(error);
    }
}