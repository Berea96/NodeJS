var express = require('express');
var mysql = require('mysql');
var dbconfig = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.send('Root');
  res.sendHead
});

app.get('/regi', (req, res) => {
  var sql = 'insert into `member`(`id`, `pw`) values = ?;';
  var values = [
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5']
  ];
  connection.query(sql, [values], (err, result) => {
    if(err) throw err;
    console.log("result : " + result.affectedRows);
  });
});

app.get('/persons', (req, res) => {
  connection.query('select * from member', function(err, rows) {
    if(err) throw err;

    console.log('the solution is: ', rows);
    res.send(rows);
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
