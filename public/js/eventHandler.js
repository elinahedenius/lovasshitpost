$(function(){
  var socket = io.connect();
  var $login = $('#login')
  var $password = $('#password');
  var $submit = $('#submit');
  var $logout = $('#logout');

  $login.submit(function(e){
    e.preventDefault();
    socket.emit('process login', $password.val());
    $password.val('');
  });

  $logout.click(function(){
    socket.emit('logout');
    window.location = '/';
  });

  socket.on('success', function(){
    window.location = '/editor';
  });
});
