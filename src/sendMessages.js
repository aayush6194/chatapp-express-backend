
module.exports = (msg, sender, reciever, date, conn)=>
{
  var query1 = `INSERT INTO messages (content, sender, reciever, date) VALUES ('${msg}', '${sender}', '${reciever}', '${date}')`;
  conn.query(query1, function (err, result) {
   if (err) throw err;
   console.log("Message Recorded!");
  });
}
