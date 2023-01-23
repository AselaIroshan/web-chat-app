const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path")
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');

const saltRounds = 10 

mongoose.connect('mongodb://127.0.0.1:27017/userdb');

const time_for = 1000 * 60 * 60 * 2 ;
app.use(session({
  secret: 'secrat_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/userdata' }),
  cookie: { maxAge: time_for  }
}));


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

  console,console.log(req.session);
  if (req.session.secure){
    res.sendFile(__dirname + '/fpage.html');
  }
  else{
    res.sendFile(__dirname + '/index.html');
  }
});

app.post('/',(req,res)=>{
  
  var email = req.body.email
  var username = req.body.username
  var gender = req.body.gender
  var pass = req.body.pass

  if(username){
    bcrypt.hash(pass, saltRounds, function(err, hash) {
      const user = new useers({
        email:email,
        username:username,
        gender:gender,
        password:hash
      })
      user.save(function(err){
        if(err){
          res.send('somthing err')
        }
        else{
          res.redirect('/')
        }
      });
  });
  }
  else{

    useers.findOne({email: email}, function(err, useers) {
      if (err) {
        console.log(err);
      } 
      else {
        bcrypt.compare(pass, useers.password, function(err, result) {
          if(result) {
            req.session.secure = true
            res.sendFile(__dirname + '/fpage.html');
          }
          else{
            res.send('email or password could be wrong plz check for it ')
          }
});
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