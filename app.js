//Express is API making framework
const express = require("express");


//bringing userRouter
const userRouter = require("./router/userRouter");

//bringing postRouter
// const postRouter = require("./router/postRouter");

//bringing commentRouter
// const commentRouter = reqire("./router/commentRouter");



//creating a app named server.
const app = express();

app.use(express.json());

//here User, Post, Comment are the entities of our arcitecture.





/********************************************User************************ */
app.use("/api/v1/user", userRouter);



/**********************************************POST (posting a article over app) ************************************/
// app.use("/api/v1/post", postRouter);



/***********************************************COMMENTS AND LIKES ******************************************* */
// app.use("/api/v1/comments", commentRouter);





//start listening to server, at port 3000
app.listen(3000, () => {
    console.log("server started at port 3000");
})