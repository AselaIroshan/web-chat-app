$("button").click(function (e) { 
    e.preventDefault();
    let chat = $("input").val();
    $.post( "/fpage", { name:chat },function(err){
        if (err){
            console.log(err)
        }
    } );
    let chat_history = $("<h1>").append(chat)
    $(".chatbox").append(chat_history)
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/fpage",
        success: function (response) {
            console.log(response)
        }
    });
    
});
