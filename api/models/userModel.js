import mongoose from "mongoose";
import { type } from "os";
import { boolean } from "webidl-conversions";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/05/69/90/73/360_F_569907313_fl7W3gX7YIVw2r05B4Ij1c21ix4xRUqD.jpg",
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;