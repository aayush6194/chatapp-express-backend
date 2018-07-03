const express = require("express");
var requests = require("./src/request");
var sockets = require("./src/socket");
var db = require("./src/db");

var port = 3001 || process.env.PORT;
const app = express();

app.use(express.static("public"));
requests(app);

db.connect((err)=>{
  if(err) {console.log("Error Connecting to the Database.");}
  else{console.log("Connected to the Database.");}
});

const server = app.listen(port, ()=>{console.log(`Server Running on Port:${port}.`); });
sockets(server);
