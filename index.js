import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";
import {user} from './classes/user.js';
import{post} from './classes/post.js';
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import './controllers/userController.js'
import './controllers/postController.js'

dotenv.config({path: './config.env'});
const saltRounds = 10;

//mongoose.connect(process.env.DATABASE.replace('<db_password>',process.env.DATABASE_PASSWORD), {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//    useCreateIndex: true,
//    useFindAndModify: false,
//  
//}).then(() => console.log('MongoDB Connected...'));

const testUser1Password = "12345test1";
bcrypt.hash(testUser1Password,saltRounds, async (err,hash) => {
    if (err) throw err;
    const testUser1 = new userMod({
        username: "user1",
        password: hash
    });
   await testUser1.save().then((result) => {
        console.log("User1 saved successfully",result);
    }).catch((err) => {
        console.log(err);
    });
});


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));
let currUser = null;

app.get('/', (req, res) => {
res.render(__dirname + "/views/signin.ejs");
});
app.get('/signup', (req, res) => {
    bcrypt.hash(testUser1Password,saltRounds, async (err,hash) => {
        if (err) throw err;
        const testUser1 = new userMod({
            username: "user1",
            password: hash
        });
       await testUser1.save().then((result) => {
            console.log("User1 saved successfully",result);
        }).catch((err) => {
            console.log(err);
        });
    });

});
app.get('/homepage', (req, res) => {


});
app.post('/login', (req, res) => {
    //this route checks the password ideally a hash mechanism
    if (req.body["password"] === "I") {
    res.render(__dirname + "/views/homepage.ejs", {
        username: req.body["username"],
        posts: TempUsers[req.body["username"]].posts
    }
    );
    }
    else {
        res.sendFile(__dirname + '/public/signin.html');
    
    }
    });
app.post('/newPost', (req, res) => {
    //this route creates a new post on the database
    const postId = TempUsers[req.body["username"]].createPost(req.body["title"],req.body["content"]);
    res.send(postId);

});
app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
});
app.delete('/delete-post', (req, res, next) => {
    
    TempUsers[req.body["username"]].deletePost(req.body["id"]);
    res.send(req.body["id"]).json();
  });

  app.put('/update-post', (req, res, next) => {
    TempUsers[req.body["username"]].updatePost(req.body["title"], req.body["content"], req.body["id"]);
    res.send(req.body["id"]).json();
  });

let TempUsers = {
    "user1": new user("user1","I","origami@gmail.com",1),
    "user2": new user("user2", "ILovePython"),
    "user3": new user("user3", "ILoveJavaScript"),
    "user4": new user("user4", "ILoveJava"),
    "user5": new user("user5", "ILoveRuby")
}; // temporary storage should only hold about 5 users before sending to database
//This is used while we set up the database