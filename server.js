/**
 * Created by Owner on 12/29/2016.
 */
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection',function(socket){
    socket.on("new-message",function(message){
        io.emit("broadcast",message);
    });
    socket.on("new-user",function(user){
        io.emit("new-user",user);
    })

});

http.listen(8000,function(){
   console.log("Listening on port 8000");
});