/*
 * Cesar Guerrero
 * CS5610 - Fall 2022
 * 11/08/22
 * 
 * Assignment 8
 */

import express from "express";
import cors from "cors";

//Import our controller
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users/users-controller.js";
import TuitController from "./controllers/tuits/tuits-controller.js";

//Setting up the server
const app = express();
app.use(express.json());
app.use(cors());


//Pass our app to our controllers
HelloController(app);
UserController(app);
TuitController(app);

//We want our app to perpetually listen to calls at local port 4000 or at a port given by the remote server
let port = 4000;
app.listen(process.env.PORT || port)