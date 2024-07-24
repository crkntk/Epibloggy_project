import { nanoid } from 'nanoid'
import{post} from './post.js';
class user {
    constructor(name, password,email,id) {
      this.name = name;
      this.password = password;
      this.email = email;
      this.id = id;
      this.posts = {};
    }
    createPost(title,content) {
      let randomPostId = nanoid();
      let currDate = new Date();
      this.posts[randomPostId] = new post(title, currDate ,content,5,randomPostId);
    }
    deletePost(postId){
      delete this.posts[postId];
    }
    updatePost(Newtitle,Newcontent,id) {
      if(Newtitle ){
        this.posts[id].title = Newtitle;
      }
      if(Newcontent){
        this.posts[id].content = Newcontent;
      }
    }
  }
  export {user};