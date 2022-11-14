/*
 * Cesar Guerrero
 * CS5610 - Fall 2022
 * 11/13/22
 * 
 * Assignment 9
 */

import tuitsModel from "../models/tuits-model.js";

/*
The Data Access Objects are the high-level way our application interacts with the database
*/

function findTuits(){
    return tuitsModel.find();
}

function findTuitsById(tid){
    return tuitsModel.findById(tid);
}

function createTuit(tuit){
    return tuitsModel.create(tuit);
}

function deleteTuit(tid){
    return tuitsModel.deleteOne({_id: tid});
}

function updateTuit(tid, tuit){
    return tuitsModel.updateOne({_id: tid}, {$set: {...tuit}});
}

export {findTuits, findTuitsById, createTuit, deleteTuit, updateTuit}