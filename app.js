var express = require('express'), path = require('path');
var socketio = require('socket.io');


var app = module.exports = express.createServer().configure(function() {
    this.set('views', path.join(__dirname, "views"));
    this.use(express.static(path.join(__dirname, "public")));
    
    this.set('view engine', 'ejs.html');
    this.register('ejs.html', require('ejs'));
});

var cellData =  {
    'B1' : "from server"
};

app.get('/grid', function (req, res) {
    res.render('grid', {cellData: cellData});
});

var io = socketio.listen(app);

io.sockets.on('connection', function(socket) {
	socket.on('cellEdit', function(data) {
		console.log('got message: ' + JSON.stringify(data));
		cellData[data.cellName] = data.val;
		socket.broadcast.emit('cellEdit', data);
	});
});


app.listen(8080);
