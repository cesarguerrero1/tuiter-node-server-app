/*
 * Cesar Guerrero
 * CS5610 - Fall 2022
 * 11/08/22
 * 
 * Assignment 8
 */

import posts from "./tuits.js";
let tuits = posts;

function createTuit(req, res){
    let newTuit = req.body;
    //Changing some stuff about the Tuit that the user doesn't need to know
    newTuit = {
        ...newTuit,
        "_id": ((new Date()).getTime()),
        "topic": "Space",
        "username": "NASA",
        "handle": "@nasa",
        "image": "nasa.jpeg",
        "time": "2h",
        "liked": false,
        "replies": 0,
        "retuits": 0,
        "likes": 0,
        "disliked": false,
        "dislikes": 0,
    }
    tuits.push(newTuit);
    return res.json(newTuit);
}

function findTuits(req, res){
    return res.json(tuits);
}

function updateTuit(req, res){
    const changedTuit = req.body; //In this instance we are only using this if we are changing the actual content
    const tid = parseInt(req.params.tid);
    let queryValue = req.query.update;

    //First thing to do is check if the tuit we are updating even exists!
    let index = tuits.findIndex((tuit) => {
        return tuit._id === tid;
    });

    //If the Tuit doesnt exist then we cant edit and we should send an error
    if(index === -1){
        return res.json(204)
    }

    //Grab the tuit we are planning to change
    const tuitToChange = tuits[index];
    
    if(queryValue === 'likeTuit'){
        //We haven't liked it yet!
        if(tuitToChange.liked !== true){
            tuits[index] = {
                ...tuitToChange,
                "liked": true,
                "likes": tuitToChange.likes + 1
            }
        }else{
            //We have liked it!
            tuits[index] = {
                ...tuitToChange,
                "liked": false,
                "likes": tuitToChange.likes - 1
            }
        }
    }else if(queryValue === 'dislikeTuit'){
        //We haven't disliked it yet so add a dislike
        if(tuitToChange.disliked !== true){
            tuits[index] = {
                ...tuitToChange,
                "disliked": true,
                "dislikes": tuitToChange.dislikes + 1
            }
        }else{
            //We have disliked it so remove the dislike
            tuits[index] = {
                ...tuitToChange,
                "disliked": false,
                "dislikes": tuitToChange.dislikes - 1
            }
        }
    }else{
        tuits[index] = {
            ...tuitToChange,
            ...changedTuit
        }
    }
    return res.json(tuits[index]);
}

function deleteTuit(req, res){
    const tid = parseInt(req.params.tid);

    //We want to try and find the Tuit Index
    let index = tuits.findIndex((tuit) => {
        return tuit._id === tid;
    });

    //If the tuit exists then do work otherwise send a bad status
    if(index !== -1){
        tuits.splice(index, 1);
        //Succesful deletion
        return res.sendStatus(200);
    }else{
        return res.sendStatus(204);
    }
}

function TuitController(app){
    app.post("/tuits", createTuit);
    app.get("/tuits", findTuits);
    app.put("/tuits/:tid", updateTuit);
    app.delete("/tuits/:tid", deleteTuit);
}

export default TuitController;