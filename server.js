var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var mysql = require('mysql');
var tools = require('./tools.js');

//create a mysql connection
var db = mysql.createConnection({
  host: 'localhost',
  user: 'lovasshitposts',
  password: 'testPassword',
  database: 'lovasshitposts'
});

//connect to database
db.connect(function(err) {
  if (err) throw err;
  console.log('Connected to database');
});

connections = [];

//Login stuff
var loggedIn = false;
attemptsLeft = 5;

//start the server
http.listen(3000, function () {
  console.log('Server started');
});
app.use(express.static(__dirname + '/public/'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/login', function(req, res){
  res.sendFile(__dirname + '/public/login.html');
});
app.get('/editor', function(req, res){
  if(loggedIn == true){
    res.sendFile(__dirname + '/public/editor.html');
  }
  if(loggedIn == false){
    res.sendFile(__dirname + '/public/index.html')
  }
});

io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.lenght);

  //Disconnect
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.lenght)
  });

  //Send message
  socket.on('send message', function(data){
    console.log(data);
    io.sockets.emit('new message', {msg: data});
  });

  //Login
  socket.on('process login', function(data){
    db.query("select * from users where username = 'lova'", function (err, result, fields){
      if(err) throw err;
      res = (result[0].password);
      if(data == res){
        loggedIn = true;
        attemptsLeft = 5;
        console.log('success');
        io.sockets.emit('success');
      }
      else{
        loggedIn = false;
        attemptsLeft = attemptsLeft - 1;
        console.log('wrong password')
        console.log(attemptsLeft)
        io.sockets.emit('failure!', {msg: attemptsLeft});
      }
    });
  });

  //Logout
  socket.on('logout', function(){
    loggedIn = false;
  });
});
