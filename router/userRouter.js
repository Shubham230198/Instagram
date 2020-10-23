const express = require("express");

//asking functions from "controler/userControler"
const {getAllUsers, createUser, getUser, updateUser, deleteUser, checkBody, createRequest, acceptRequest} = require("../controler/userControler");

const userRouter = new express.Router();

//when the request is made on "/api/v1/user".
userRouter.route("/").post(checkBody, createUser).get(getAllUsers);

//when the request is made on "/api/v1/user/request"
userRouter.route("/request").post(checkBody, createRequest).patch(checkBody, acceptRequest);


//when the request is made on "/api/v1/user/:uid"
userRouter.route("/:uid").get(getUser).patch(checkBody, updateUser).delete(deleteUser);


//when the request is made on "/api/v1/user/acceptReq"
// userRouter.route("/acceptReq").patch(checkBody, acceptRequest);


module.exports = userRouter;
