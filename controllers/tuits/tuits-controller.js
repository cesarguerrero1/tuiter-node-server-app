/*
 * Cesar Guerrero
 * CS5610 - Fall 2022
 * 11/08/22
 * 
 * Assignment 8
 */

import * as tuitsDao from "../../daos/tuits-dao.js";

async function createTuit(req, res){
    let newTuit = req.body;
    //Changing some stuff about the Tuit that the user doesn't need to know
    newTuit = {
        ...newTuit,
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
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    return res.json(insertedTuit);
}

async function findTuits(req, res){
    //Note that we are calling the DAO which will then interact with the database
    const tuits = await tuitsDao.findTuits();
    return res.json(tuits);
}

async function updateTuit(req, res){
    const changedTuit = req.body; //In this instance we are only using this if we are changing the actual content
    const tid = parseInt(req.params.tid);
    let queryValue = req.query.update;

    //Grab the tuit!
    const databasetuit = await tuitsDao.findTuitsById(tid);

    if(databasetuit){
        if(queryValue === 'likeTuit'){
            //We haven't liked it yet!
            if(databasetuit.liked !== true){
                await tuitsDao.updateTuit({_id: tid}, {$set:{"liked": true,"likes": databasetuit.likes + 1}})
            }else{
                //We have already liked it!
                await tuitsDao.updateTuit({_id: tid}, {$set:{"liked": false,"likes": databasetuit.likes - 1}})
            }
        }else if(queryValue === 'dislikeTuit'){
            //We haven't disliked it yet so add a dislike
            if(databasetuit.disliked !== true){
                await tuitsDao.updateTuit({_id: tid}, {$set:{"disliked": true,"dislikes": databasetuit.likes + 1}})
            }else{
                //We have already disliked it so remove the dislike
                await tuitsDao.updateTuit({_id: tid}, {$set:{"disliked": false,"dislikes": databasetuit.likes - 1}})
            }
        }else{
            await tuitsDao.updateTuit({_id: tid}, {$set:{...changedTuit}})
        }
        //At the end of it all return the updated tuit!
        return await tuitsDao.findTuitsById(tid);
    }else{
        //Our search was null!
        return res.send(204);
    }
}

async function deleteTuit(req, res){
    const tid = parseInt(req.params.tid);

    //Mongo sends an object that contains the status of the deletion
    const status = await tuitsDao.deleteTuit(tid);
    if(status.deletedCount === 1){
        return res.send(200);
    }else{
        return res.send(204);
    }

}

async function TuitController(app){
    app.post("/tuits", createTuit);
    app.get("/tuits", findTuits);
    app.put("/tuits/:tid", updateTuit);
    app.delete("/tuits/:tid", deleteTuit);
}

export default TuitController;