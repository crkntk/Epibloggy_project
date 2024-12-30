import mongoose from 'mongoose';
import "./postModel.js";
const userSchema = new mongoose.Schema({
    username: {type: String, required: [true,"A user needs a username"], unique: true},
    password: {type: String, required: true},
    email: {type: String, required: [true,"A user needs an email"], unique: true},
    id: {type: String, default: mongoose.Types.ObjectId},
    posts: [postSchema]
});
const userMod = mongoose.model('Users',userSchema );
module.exports = userMod;