
ar express = require('express');
const path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();
var PORT =3000  
// This middleware will not allow the
// request to go beyond it

    
// Requests will never reach this route
app.get('/', function (req , res) {
    res.sendFile(path.join(__dirname, '/index.html'))
    
});


app.post("/",function(req,res) {
    console.log(req.body)
})
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});