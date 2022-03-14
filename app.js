const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");

//const posts = [];
const app = express();
const mongoose = require("mongoose");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//connect to the database
mongoose.connect("mongodb://localhost:27017/blogDB");

//mongodb schemas and stuff

const postSchema = {

  title: String,
 
  content: String
 
 };
 const Post = mongoose.model("Post", postSchema);
 

//GETS

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    console.log(posts);
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });

});

app.get("/contact", (req, res) => {
  res.render(__dirname + "/views/contact.ejs", { contactContent: contactContent });
});

app.get("/about", (req, res) => {
  res.render(__dirname + "/views/about.ejs", { aboutContent: aboutContent });
});

app.get("/compose", (req, res) => {
  res.render(__dirname + "/views/compose.ejs");
});

//get any url in the specified path
app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){

    res.render("post", {
 
      title: post.title,
 
      content: post.content
 
    });
 
  });
 
 
})

//POSTS FROM FORMS

app.post("/compose", (req, res) => {
      //save in a post object
      const post = new Post ({

        title: req.body.title,
     
        content: req.body.textBody
     
      });
  //save to the list
  console.log(post);
  post.save((err)=>{
    if (!err){
      res.redirect("/");
    }
  });
  //redirect to the main page 
});





//start the server
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
