import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";
import {user} from './classes/user.js';
import{post} from './classes/post.js';
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

});
app.get('/homepage', (req, res) => {


});
app.post('/check', (req, res) => {
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