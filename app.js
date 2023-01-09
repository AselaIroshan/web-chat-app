const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname, 'public')));

var PORT =3000  


app.get('/', function (req , res) {
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.post('/',(req,res)=>{
    username= req.body.u
    password= req.body.p

});

app.get("/fpage",function(req,res) {
    res.sendFile(path.join(__dirname, "/firstpage.html"))

})





app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});