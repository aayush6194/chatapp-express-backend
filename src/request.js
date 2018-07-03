var request = (app)=>{

  console.log("Online.");
  var bodyParser = require("body-parser"); //post request
  var urlencodedParser = bodyParser.urlencoded({extended: false});

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get("/", (req, res)=>{res.sendFile(__dirname + "/../public/index.html");});

  app.get("/api", (req, res)=>{
    var obj = JSON.stringify({poop: "poop"});
    res.send(obj);});



  app.get("/test", (req, res)=>{
     var msg = [];
      var conn = require('./db');
      conn.query('SELECT * FROM test', (err, result, fields)=>{
        if(err) {throw err;}

        res.send(result);
      });
  });

  app.get("/messages:user", (req, res)=>{
     var msg = [];
     console.log("Get Request.");
      var conn = require('./db');
      conn.query(`SELECT * FROM messages WHERE sender='${req.params.user}' OR sender='all' OR reciever='all' OR reciever='${req.params.user}'`, (err, result, fields)=>{
        if(err) {throw err;}
        for(var i =0; i < result.length; i++){
          if(result[i].sender == req.params.user.substring(1)){
            result[i].type = "sent";

          }
          else{
            result[i].type = "recieved";
          }
        //   console.log(result[i].sender + " " +  req.params.user);
        }
        console.log(result);
        res.send(result);
      });
  });

  app.post("/verify", urlencodedParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);
    data = req.body;
    var conn = require('./db');
    conn.query(`SELECT * FROM user WHERE username = '${data.user}' AND password = '${data.password}'`, (err, result)=>{
      if (err) throw err;

      console.log(`Database found: ${result.length}`);
      var obj = JSON.stringify({verified: result.length>=1, user: req.body.user});
      res.send(obj);
    });

    });
  };

module.exports = request;
