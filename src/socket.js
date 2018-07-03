

module.exports = (server)=>{
  var socket = require("socket.io");
  var io = socket(server);

  console.log(`Sockets Running.`);

  io.on("connection", (socket)=>{
    console.log(`Socket ID '${socket.id}' Connected.`);

    socket.on("message", (data)=>{
      io.sockets.emit("message", data);
      var conn = require('./db');
      var recordMessage = require("./sendMessages");
      var date = new Date().toISOString().slice(0, 19).replace('T', ' ').substring(0, 10);
      recordMessage(data.message, data.sender, data.reciever, date, conn);
    });

     socket.on('disconnect', ()=>{console.log(`Socket ID '${socket.id}' Disconnected.`);});
  });

};
