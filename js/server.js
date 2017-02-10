/**
 * Created by Owner on 12/29/2016.
 */

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 8080;
const INDEX = path.join(__dirname,'../dist','index.html');
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);
server.listen(PORT);
app.use(express.static(path.join(__dirname,'../dist')));
app.get('*',(req,res)=> res.sendFile(INDEX));
io.on("connection",(socket)=>{
    socket.on("new-message",(message)=>{
        io.emit("broadcast",message);
    });
});
