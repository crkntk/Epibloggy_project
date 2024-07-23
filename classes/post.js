class post {
    constructor(title, dateObj, content, userId, id) {
        this.title = title; //string
      this.date = dateObj.toLocaleDateString(); // 
      this.content = content;
      this.userId = userId;
      this.id = id;
      this.time = dateObj.toLocaleTimeString();
    }
  }
  export {post};