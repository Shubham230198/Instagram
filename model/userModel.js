const connection = require("./connection");
const {v4: uuidv4} = require('uuid');


let create = (userObj) => {
    
    //set a unique id to user, using uuid.
    userObj.uid = uuidv4();

    //insert new user into users table, with a promise.
    return new Promise(function (resolve, reject) {
        
        connection.query("INSERT INTO user SET ?", userObj, function(err, result) {
            if(err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(result);
            }
    
        });    
    })
    
}

//get all User-data from table "user"
let getAllUsers = () => {
    return new Promise(function (resolve, reject) {    
        connection.query("SELECT * FROM user", function(err, result) {
            if(err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(result);
            }
    
        });    
    })
}


//get User-data from table "user" by uid 
let getById = (uid) => {

    return new Promise(function(resolve, reject) {
        connection.query(`SELECT * FROM user WHERE uid = "${uid}"`, function(err, result) {
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    })
}


//update a user record into the database.
let update = (uid, toUpdateObject) => {

    //a string to be passed as updating fileds and their values
    let updateString = "";
    for(let attr in toUpdateObject) {
        updateString += `${attr}="${toUpdateObject[attr]}",`;
    }
    updateString = updateString.substring(0, updateString.length - 1);

    // console.log(updateString);

    return new Promise(function (resolve, reject) {
        connection.query(`UPDATE user SET ${updateString} WHERE uid = "${uid}"`, function(err, result) {
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    })
    
}


//to delete a user from database.
let deleteUser = (uid) => {

    return new Promise(function (resolve, reject) {
        connection.query(`DELETE FROM user WHERE uid = "${uid}"`, function(err, result) {
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    })
} 

module.exports.getAllUsers = getAllUsers;
module.exports.create = create;
module.exports.getById = getById;
module.exports.update = update;
module.exports.deleteUser = deleteUser;