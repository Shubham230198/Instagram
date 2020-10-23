const getAllPost = (req, res) => {
    
    res.status(201).json({
        status: "success",
        userDB: userDB
    })
}

const getPost = (req, res) => {
    
    //get uid of the comming request
    let cUid = req.params.uid;
    
    //get the particular user from users Array, using filer function.
    let userArr = users.filter((user) => {
        return user.uid == cUid;
    })
    
    console.log(req.params);
    
    //return the data of requested user (if exists).
    res.status(201).json({
        status: "success",
        user: userArr.length == 0 ? "No such user" : userArr[0]
    })
    
}

const createPost = (req, res) => {

    //get the req data, print it on console.
    let user = req.body;
    console.log(user);

    //set a unique id to user, using uuid.
    user.uid = uuidv4();

    //append the user data into users array, and add this to user.json file.
    users.push(user);
    fs.writeFileSync("./db/user.json", JSON.stringify(users));

    //return the response to client.
    res.status(201).json({
        status: "success",
        user: req.body
    })
}

const updatePost = (req, res) => {
    let user = getUserById(req.params.uid);
    let toBeUpdatedObj = req.body;

    for(let key in toBeUpdatedObj) {
        console.log(key);
        user[key] = toBeUpdatedObj[key];
    }

    fs.writeFileSync(path.join(__dirname, "db/user.json"), JSON.stringify(userDB));

    res.status(200).json({
        status: "success",
        user: user
    })
}

const deletePost = (req, res) => {
    //get the uid of user, (to be deleted)from the params of req.
    let cid = req.params.uid;
    console.log(userDB.length);

    //removing the userDB object
    userDB = userDB.filter((user) => {
        return user.uid != cid;
    });

    //updating the final DB file. 
    fs.writeFileSync(path.join(__dirname, "/db/user.json", JSON.stringify(userDB)));

    res.status(200).json({
        status: "success",
        length: userDB.length,
        userDB
    });
}
