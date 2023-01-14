var socket = io();

socket.emit('message', {text: 'Hello Server'});


$("button").click(function (e) { 
    e.preventDefault();
    let chat = $("input").val();
    
    $.post( "/fpage", { name:chat } );

});

$.get("/chat",function(data){
    var cht = data;
    let chat_history = $("<h1>").append(cht);
    $(".chatbox").append(chat_history);

});