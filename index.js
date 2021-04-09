const express = require('express')();

const app = require('express')();
const server = require('http').Server(app);
const io =  require("socket.io")(server);
server.listen(3000);
let numClients = 0;

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

users = [];
connections = [];

io.sockets.on('connection',  (socket)=> {
    numClients+=1
    console.log("Успешное соединение");
    connections.push(socket);
    io.sockets.emit('add mess', {mess: `количество пользователей в чате${numClients}`,  name: 'system' });



    socket.on('disconnect', function (data) {
        numClients-=1
        connections.splice(connections.indexOf(socket));
        console.log("Отключился");
        io.sockets.emit('add mess', {mess: `количество пользователей в чате${numClients}`, name: 'system' });
    });

    socket.on('send mess', function (data) {
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    })

    // io.on('connection', (socket) => {
    //     io.sockets.emit('number sockets', numClients++);
    //
    //     socket.on('disconnect', () => {
    //         io.sockets.emit('number sockets', numClients--);
    //     });
    // });
})
