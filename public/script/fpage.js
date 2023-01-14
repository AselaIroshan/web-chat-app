var socket = io();

$("form").submit(function (e) { 
    e.preventDefault();
    var cht = $("input").val();
    if (cht) {
        socket.emit('chat message', cht);
        cht = '';
      }
    
});
socket.on('chat message', function(msg) {
    var txt = $("<h1>").append(msg);
    $(".chatbox").append(txt);
  });