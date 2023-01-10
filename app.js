const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname, 'public')));

var PORT =3000  
const chats = []


app.get('/', function (req , res) {
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.post('/',(req,res)=>{
    let username= req.body.u
    let password= req.body.p

});



app.get("/fpage",function(req,res) {

    res.render("page/fpage",{chat:chats
    });
});

app.post("/fpage",function(req,res){
    let chat= req.body.chat
    chats.push({name:chat})

});





app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});