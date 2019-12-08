require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const title = "GameNews";
const path = require('path')
const jwt = require('jsonwebtoken')
router.use(bodyParser.json());
var fs = require('fs');
var readData = fs.readFileSync('gameList.json');
var gamesList2 = JSON.parse(readData);
var user = fs.readFileSync('users.json');
var Users = JSON.parse(user);

router.get('/', function (req, res, next) {
  res.render('index', { title, condition: true });
});


router.get('/game/all/', authenticateToken, (req, res, next) => {
  res.json({
    gamesList2
  })
});

router.get('/game/name/', authenticateToken, (req, res, next) => {
  var nameTab = [];
  var i;
  for (i = 0; i < gamesList2.length; i++) {
    var sendDate = gamesList2[i].name + "!" + gamesList2[i].pictures;
    nameTab.push(sendDate);
  }
  res.json({
    nameTab
  })
});


router.get('/game/:id?', authenticateToken, (req, res, next) => {
  var data = req.params;
  var id = data.id;
  console.log("game id: ", id);
  var game = gamesList2[id].name + "!" + gamesList2[id].nameNext + "!" + gamesList2[id].studio + "!" + gamesList2[id].type
    + "!" + gamesList2[id].data + "!" + gamesList2[id].desr + "!" + gamesList2[id].pictures
  console.log(game)
  res.json({
    game
  })
});

router.post('/', authenticateToken, function (req, res) {
  console.log("input -> ", req.body);
  var input = JSON.stringify(req.body);
  var inputArray = input.split("!")
  var regex = /,/gi;
  var game = {
    name: inputArray[1],
    nameNext: inputArray[2],
    studio: inputArray[3],
    type: inputArray[4],
    data: inputArray[5],
    desr: inputArray[6],
    pictures: inputArray[7].replace(regex, "/"),
  }
  var pass = 0;
  for (var i = 0; i < gamesList2.length; i++) {
    if (gamesList2[i].name === inputArray[1]) {
      console.log("taki plik juz istnieje!");
      this.pass = 1;
      res.status(501).end();
    }

  }
  console.log(this.pass)
  if (this.pass === 0) {
    gamesList2.push(game);
    var data = JSON.stringify(gamesList2);
    fs.writeFile('gameList.json', data, finished);
    res.status(201).end();
    function finished(err) {
      console.log('all done');
    }
  }
  this.pass = 0;


});


router.post('/login', function (req, res) {
  console.log("input -> ", req.body);
  var input = JSON.stringify(req.body);
  var inputArray = input.split("!")
  var login = inputArray[1];
  var password = inputArray[3];
  newUser = {
    "login": login,
    "password": password
  }

  if (Users[0].login == newUser.login || Users[1].login == newUser.login) {
    if (Users[0].password == newUser.password || Users[1].password == newUser.password) {
      const accessToken = generateAccessToken(newUser);
      console.log("zalogowano!")
      res.statusMessage = accessToken;
      res.status(201).end();
      // console.log(token);   


    } else {
      console.log("Błąd logowania! Zle haslo")
      res.status(405);
      res.send('Błędne hasło!');
    }
  } else {
    console.log("Blad logowania! Nie ma takiego uzytkownika")
    res.statusMessage = "Current password does not match";
    res.status(406).end();
  }

});

router.delete('/', authenticateToken, function (req, res) {
  console.log("input DELETE -> ", req.body);
  var input = JSON.stringify(req.body);
  var inputArray = input.split("!")

  gamesList2.splice(inputArray[1], 1);
  var data = JSON.stringify(gamesList2);
  fs.writeFile('gameList.json', data, finished);


  function finished(err) {
    console.log('all set');
  }

  res.send("ok")
});


router.put('/', authenticateToken, function (req, res) {
  console.log("input PUT -> ", req.body);
  req.headers
  var input = JSON.stringify(req.body);
  var inputArray = input.split("!")
  var regex = /,/gi;
  var id = inputArray[8]

  var game = {
    name: inputArray[1],
    nameNext: inputArray[2],
    studio: inputArray[3],
    type: inputArray[4],
    data: inputArray[5],
    desr: inputArray[6],
    pictures: inputArray[7].replace(regex, "/")
  }

  gamesList2.splice(id, 1);
  gamesList2.push(game)

  var data = JSON.stringify(gamesList2);
  fs.writeFile('gameList.json', data, finished);

  res.send("ok")
});

function finished(err) {
  console.log('all done');
}

function generateAccessToken(newUser) {

  return jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
}

function authenticateToken(req, res, next) {

  const authHeader = req.headers.authorization
  try {
    var authHeaderSplited = authHeader.split(" ")
  } catch{
    res.sendStatus(401)
  }

  var token = authHeaderSplited[2];
  console.log("TOKOEN : ", token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log("ERROR ", err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}




module.exports = router;