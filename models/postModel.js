import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: [true,"A post needs content"]},
    date: {type: Date, default: Date.now},
    time: {type: String, default: new Date().toLocaleTimeString()}
});


const postsMod = mongoose.model('Posts',postSchema );
module.exports = postsMod;