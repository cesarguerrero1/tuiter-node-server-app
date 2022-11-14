/*
 * Cesar Guerrero
 * CS5610 - Fall 2022
 * 11/08/22
 * 
 * Assignment 8
 */

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

//Import our controller
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users/users-controller.js";
import TuitController from "./controllers/tuits/tuits-controller.js";

//Setting up the server
const app = express();
app.use(express.json());
app.use(cors());

//Connect to our database - LOCALLY OR REMOTELY
mongoose.connect(process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/tuiter');

//Pass our app to our controllers
HelloController(app);
UserController(app);
TuitController(app);

//We want our app to perpetually listen to calls at local port 4000 or at a port given by the remote server
let port = 4000;
app.listen(process.env.PORT || port)