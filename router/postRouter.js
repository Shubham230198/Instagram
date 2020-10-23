const {v4: uuidv4} = require('uuid');

//when the request is made on "/api/v1/user".
app.route("/api/v1/user").post(createUser).get(getAllUser);

//when the request is made on "/api/v1/user/:uid"
app.route("api/v1/user/:uid").get(getUser).patch(updateUser).delete(deleteUser);

