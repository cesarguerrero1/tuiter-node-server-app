/*
 * Cesar Guerrero
 * CS5610 - Fall 2022
 * 11/13/22
 * 
 * Assignment 9
 */

import mongoose from "mongoose";

/* We are defining a schema for how data is allowed to be inserted into the
tuits collection. 
*/
const tuitsSchema = mongoose.Schema({
    //We are defining what data type will be expected for each key-value pair
    tuit: String,
    likes: Number,
    liked: Boolean,
}, {collectiion: "tuits"});

export default tuitsSchema