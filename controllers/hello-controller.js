/*
 * Cesar Guerrero
 * CS5610 - Fall 2022
 * 11/08/22
 * 
 * Assignment 8
 */

function HelloController(app){
    //Listening to HTTP Requests
    app.get("/hello", (req, res) => {res.send("Hello World!")});
    app.get("/", (req, res) => {res.send("Welcome to Full Stack Development")})
}

export default HelloController;

