const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path")
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

mongoose.connect('mongodb://127.0.0.1:27017/userdb');

const usersSchema = new mongoose.Schema({
  email: String,
  username: String,
  gender : String,
  password : String 
    });
const useers = mongoose.model('persons', usersSchema);

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/',(req,res)=>{
  var email = req.body.email
  var username = req.body.username
  var gender = req.body.gender
  var pass = req.body.pass

  if(username){
    const user = new useers({
      email:email,
      username:username,
      gender:gender,
      password:pass
    })
    user.save(function(err){
      if(err){
        res.send('somthing err')
      }
      else{
        res.sendFile(__dirname + '/fpage.html');
      }
    });
  }
  else{

    useers.findOne({email: email}, function(err, useers) {
      if (err) {
        console.log(err);
      } 
      else {
        if(useers.password === pass){
          res.sendFile(__dirname + '/fpage.html');
        }
        else{
          res.send('email or password could be wrong plz check for it ')
        }
      }
    });
    
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});