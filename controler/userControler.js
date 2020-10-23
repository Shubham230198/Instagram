const userModel = require("../model/userModel");
const userFollowerModel = require("../model/userFollowerModel");

const getAllUsers = async (req, res) => {
    try {
        let allEntry = await userModel.getAllUsers();

        res.status(201).json({
            status: "success",
            result: allEntry
        })
    }
    catch(err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
    
}

const getUser = async (req, res) => {
    
    //get uid of the comming request
    let cUid = req.params.uid;
    console.log(cUid);

    try {
        let user = await userModel.getById(cUid);

        //return the data of requested user
        res.status(201).json({
            status: "success",
            user: user
        })
    }
    catch(err) {

        res.status(500).json({
            status: "failure",
            user: err.message
        })
    }
    
}


const createUser = async (req, res) => {

    //get the req data, print it on console.
    let user = req.body;
    console.log(user);

    try {
        //create new user create function of database.
        let newDBUser = await userModel.create(user);

        //return the response to client.
        res.status(201).json({
            status: "success",
            user: newDBUser
        })
    }
    catch (err){

        //returning the server error response
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }

    
}

const updateUser = async (req, res) => {
    let uid = req.params.uid;
    let toBeUpdatedObj = req.body;

    try {
        let result = await userModel.update(uid, toBeUpdatedObj);
        
        //sent back the response
        res.status(200).json({
            status: "success",
            "message": result
        })
    }
    catch(err) {
        res.status(500).json({
            status: "failure",
            "message": err.message
        })
    }
}

const deleteUser = async(req, res) => {
    //get the uid of user, (to be deleted)from the params of req.
    let cid = req.params.uid;
    
    try {
        let result = await userModel.deleteUser(cid);

        res.status(200).json({
            status: "success",
            message: result
        })
    }
    catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }

}


//check if request body is empty, (for specific functions like update, delete etc);
const checkBody = (req, res, next) => {
    // console.log(Object.keys(req.body));
    // res.status(200).json({
    //     status: "success",

    // })
    let keysArray = Object.keys(req.body);
    if(keysArray.length == 0) {
        res.status(500).json({
            status: "failure",
            message: "Request body is not found"
        })
    }
    else {
        next();
    }
}



/***********************************************Friend Request***************************************/

let createRequest = async(req, res) => {
    let obj = req.body;
    let uid = obj.user_id;
    let follower_id = obj.follower_id;

    console.log(obj);

    try {
        //make the request in database.
        let result = await userFollowerModel.createRequest(obj);

        //if user is public profile, then accept the request.
        let userRow = await userModel.getById(uid);
        let userData = userRow[0];

        if(userData.is_public == true) {
            let followedPromise = await userFollowerModel.acceptRequest(uid, follower_id);
        }

        res.status(201).json({
            status: "success",
            message: result
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}


let getAllFollowers = async (req, res) => {
    let uid = req.params.uid;

    try {
        let result = await userFollowerModel.getAllFollowers(uid);

        res.status(200).json({
            status: "success",
            message: result
        })
    }
    catch(err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}


let acceptRequest = async (req, res) => {
    console.log("done yaha tk");
    let obj = req.body;
    let user_id = obj.user_id;
    let follower_id = obj.follower_id;

    console.log(user_id + " -> " + follower_id);
    try {
        let result = await userFollowerModel.acceptRequest(user_id, follower_id);
        res.status(201).json({
            status: "success",
            message: result
        })
    }
    catch(err) {
        console.log(err);
        res.status(550).json({
            status: "fail ho gaya",
            message: err.message,
            silly: "dont know"
        })
    }

}




// let acceptRequest2 = (req, res) => {
    

//     res.status(201).json({
//                 status: "sdgsdgsdgd"
//                 // message: result
//     })
// }



module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.checkBody = checkBody;

module.exports.createRequest = createRequest;
module.exports.getAllFollowers = getAllFollowers;
module.exports.acceptRequest = acceptRequest;