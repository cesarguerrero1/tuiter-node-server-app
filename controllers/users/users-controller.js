/*
 * Cesar Guerrero
 * CS5610 - Fall 2022
 * 11/08/22
 * 
 * Assignment 8
 */

import people from "./users.js"
let users = people;

//We can make our function look for a specific subset of all our data
function findUsers(req, res){
    const type = req.query.type;
    //If there exists a type, then query on that!
    if(type){
        const usersOfType = users.filter((user) => {
            return user.type === type
        })
        return res.json(usersOfType)
    }else{
        return res.json(users);
    }
}

function findUserByID(req, res){
    const uid = req.params.uid;
    const user = users.find((user) => {
        return user._id === uid;
    })
    return res.json(user);

}

function createUser(req, res){
    const newUser = req.body;
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    return res.json(newUser);
}

function deleteUser(req, res){
    const uid = req.params.uid;
    const foundUser = users.find((user) => {
        return user._id === uid
    })

    //Depending on whether the user exists we want to act accordingly
    if(foundUser){
        let index = users.findIndex((user) => {
            return user._id === foundUser._id
        });

        console.log(index);
        users.splice(index, 1);
        //Succesful deletion
        return res.sendStatus(200);
    }else{
        //No content found!
        return res.sendStatus(204);
    }
}

function updateUser(req, res){
    const uid = req.params.uid;
    const updates = req.body;

    //Loop over the users and when we find a match, update!
    users = users.map((user) => {
        if(user._id === uid){
            //Use the spreader syntax!
            return {
                ...user,
                ...updates
            }
        }else{
            return user
        }
    })

    return res.sendStatus(200);
}

function UserController(app){
    
    //HTTP Requests allowed by this controller
    app.get("/users", findUsers);
    app.get("/users/:uid", findUserByID);
    app.post("/users", createUser);
    app.delete("/users/:uid", deleteUser);
    app.put("/users/:uid", updateUser);

}

export default UserController;