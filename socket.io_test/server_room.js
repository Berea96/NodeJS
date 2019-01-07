var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index_room.html');
});

var chat = io.of('/chat').on('connection', (socket) => {
  socket.on('chat message', (data) => {
    console.log('message from cliend: ', data);

    var name = socket.name = data.name;
    var room = socket.room = data.room;

    socket.join(room);

    chat.to(room).emit('chat message', data.room + "번 방에서 메시지 : " + data.msg);
  });
});

server.listen(3000, () => {
  console.log('Socket IO server listening on port 3000');
});
