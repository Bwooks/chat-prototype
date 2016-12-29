let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html')
});

io.on('connection',function(socket){
	console.log('New connection!');
	socket.on('disconnect',function(){
		console.log("Disconnected!");
	});

	socket.on('chat message',function(msg){
		io.emit('chat message',msg);
	});
});

http.listen(8000);