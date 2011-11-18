var app     = require('express').createServer()
  , express = require('express')
  , io      = require("socket.io").listen(app);

app.listen(8080);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.get('/sounds/message.wav', function (req, res) {
    res.sendfile(__dirname + '/sounds/message.wav');
});
app.get('/sounds/connection.wav', function (req, res) {
    res.sendfile(__dirname + '/sounds/connection.wav');
});

io.sockets.on('connection', function(socket) {
    socket.broadcast.emit('connection');

    socket.on('message', function(data) {
        socket.emit('message', { message: data.message });
        socket.broadcast.emit('message', { message: data.message });
    });
});
