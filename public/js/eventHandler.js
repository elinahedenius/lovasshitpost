$(function(){
  var socket = io.connect();
  var $login = $('#login')

  //login page
  var $password = $('#password');
  var $submit = $('#submit');

  //Editor page
  var $logout = $('#logout');

  //Editor
  var $editor = $('#editor');
  var $save = $('#saveBtn');
  var $newContent = $('#newContent');
  var $newTitle = $('#newTitle');

  $login.submit(function(e){
    e.preventDefault();
    socket.emit('process login', $password.val());
    $password.val('');
  });

  //the buttons in the button area on the editor page
  $logout.click(function(){
    socket.emit('logout');
    window.location = '/';
  });
  $('#newPost').click(function(){
    $editor.show();
  })

  //The buttons in the editor
  $save.click(function(e){
    e.preventDefault();
    var packet = [$newTitle.val(), $newContent.val()];
    socket.emit('save', {packet});
    $editor.hide();
    $newTitle.val('');
    $newContent.val('');
  })

  $('#cancelBtn').click(function(){
    $editor.hide();
  });

  //Login page
  socket.on('success', function(){
    document.getElementById('wrongPMessage').style.display = 'none';
    window.location = '/editor';
  });

  socket.on('failure!', function(){
    document.getElementById('wrongPMessage').style.display = 'flex';
  })

  socket.on('tooManyAttempts', function(){
    $submit.prop('disabled', true);
    alert('Too many attempts!');
  });
});

function loadContent(){
  var socket = io.connect();
  $(document).ready(function(){
    socket.emit('loadContent');
  });
  socket.on('loadedContent', ({res}) => {
    console.log(res);
    return loadPostsToPage(res);
  });
}
