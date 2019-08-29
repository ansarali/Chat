

import express from "express";
import bodyParser from "body-parser";
import users from "./routes/users";

const app = express();
var port = process.env.PORT || 8000;  

app.use(express.static(__dirname + "/src"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", users);

var router = express.Router();            
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const database = [
  { name: 'ChatBox', id: 0, users: [], messages: []},
  
]

let room = {};
const findRoom = (roomId) => {
  room = database.find((room) => {
    return room.id === parseInt(roomId)
  })
  return room
}

const logUser = (room, username) => {
  const userNotLogged = !room.users.find((user) => {
    return user === username
  })
  if (userNotLogged) {
    room.users.push(username)
  }
}

router.get('/rooms', function(req, res) {
    const rooms = database.map((room) => {
      return {name: room.name, id: room.id}
    })
    res.json(rooms);
});

router.get('/rooms/:roomId', function(req, res) {
  room = findRoom(req.params.roomId)
  if (room.error) {
    res.json(room)
  } else {
    res.json({name: room.name, id: room.id, users: room.users});
  }
})

router.route('/rooms/:roomId/messages')
  .get(function(req, res) {
    room = findRoom(req.params.roomId)
    if (room.error) {
      res.json(room)
    } else {
      res.json(room.messages);
    }
  })
  .post(function(req, res) {
    room = findRoom(req.params.roomId)
    if (room.error) {
      res.json(room)
    } else if (!req.body.name || !req.body.message) {
      res.json({error: 'request missing name or message'});
    } else {
      logUser(room, req.body.name)
      let now = new Date();
      now.getHours();         // 0
      now.getMinutes();  
      let timeandDate = `${now.getHours()}:${now.getMinutes()}`
      room.messages.push({name: req.body.name, message: req.body.message,time:timeandDate})
      res.json({message: 'OK!'});
    }
  })

app.use('/api', router);

app.listen(port, () =>
  console.log(`Server is listening on port ${port}`)
);
