/*
 * Cesar Guerrero
 * CS5610 - Fall 2022
 * 11/13/22
 * 
 * Assignment 9
 */

import mongoose from "mongoose";
import tuitsSchema from "../schemas/tuits-schema.js";

const tuitsModel = mongoose.model('TuitModel', tuitsSchema);

export default tuitsModel;