import mongoose from 'mongoose';
import postMod from "./postModel.js";
const userSchema = new mongoose.Schema({
    username: {type: String, required: [true,"A user needs a username"], unique: true},
    password: {type: String, required: true},
    email: {type: String, required: [true,"A user needs an email"], unique: true},
    id: {type: String, default: mongoose.Types.ObjectId},
    posts: {type:[postMod.schema]}
});
const userMod = mongoose.model('Users',userSchema );
export default userMod;