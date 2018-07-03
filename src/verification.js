
var check = function (data){

  var conn = require('./db');
  conn.query(`SELECT * FROM user WHERE username = '${data.user}'`, (err, result)=>{
  if (err) throw err;
    console.log(`Database found: ${result.length}`);
    datas = result.length;
  }
  );
 return datas;
}

module.exports = {
  check: check
}
