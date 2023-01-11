$("button").click(function (e) { 
    e.preventDefault();
    let chat = $("input").val();
    $.post( "/fpage", { name:chat },function(err){
        if (err){
            console.log(err)
        }
    } );
});
