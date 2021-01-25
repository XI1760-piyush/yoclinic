const mysql = require('mysql');
const config = require('./config.json');


var connection = mysql.createConnection({
  host: config.database.host,
  user: config.database.username,
  password: config.database.password,
  database: config.database.db
});


exports.exec = function (query) {
  console.log(query)
  return new Promise((resolve, reject) => {
    connection.query(query, function (error, results, fields) {
      if (error) throw reject(error)
      resolve(results)
    });
  })
};