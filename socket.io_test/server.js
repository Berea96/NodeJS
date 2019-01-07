var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

app.use(express.static(path.join(__dirname, ('img'))));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  socket.on('login', (data) => {
    console.log('Client logged-in: \n name: ' + data.name + '\n userid: ' + data.userid);

    socket.name = data.name;
    socket.userid = data.userid;

    io.emit('login', data.name);
  });

  socket.on('chat', (data) => {
    console.log('Message from %s: %s', socket.name, data,msg);

    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      msg: data.msg
    };

    io.emit('chat', msg);
  });

  socket.on('forceDisconnect', () => {
    socket.disconnect();
  });

  socket.on('disconnect', () => {
    console.log('user disconnected: ' + socket.name);
    io.emit('exit', {name: socket.name});
  });
});

server.listen(3000, () => {
  console.log('Socket IO server listening on port 3000');
});
