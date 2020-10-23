const connection = require("./connection");
const {v4: uuidv4} = require('uuid');
const { resolve } = require("path");


const createRequest = (obj) => {
    return new Promise(function (resolve, reject) {
        connection.query(`INSERT INTO user_follower SET ?`, obj, (err, result) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}

const getAllFollowers = (uid) => {
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT * from user_follower WHERE user_id = "${uid}"`, (err, result) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}

const acceptRequest = (uid, follower_id) => {
    
    return new Promise(function(resolve, reject) {
        connection.query(`UPDATE user_follower SET is_accepted = true WHERE user_id="${uid}" AND follower_id="${follower_id}"`, function(err, result) {
            if(err) {
                reject(err);
            }
            else {
                console.log("done yaha tk bhi" + result);
                resolve(result);
            }
        })
    })
}

module.exports.createRequest = createRequest;
module.exports.getAllFollowers = getAllFollowers;
module.exports.acceptRequest = acceptRequest;