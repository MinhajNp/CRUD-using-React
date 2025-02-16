import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({
        message: 'API is working',
    })
};

// Update User
export const updateUser = async (req, res, next) => {
    if (req.user.id != req.params.id) {
        return next(errorHandler(401, "User id not match!"))
    }
    try {
        if (req.body.password) {
            req.body.password = await bcryptjs.hash(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            },
            { new: true }
        );

        const { password, ...rest } = updateUser._doc;
        return res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

// delete User
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'User id not match!'));
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({ success: true, message: "User has been deleted." }); // Return JSON object
    } catch (error) {
        next(error)
    }
}