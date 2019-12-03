const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const title = "GameNews";
router.use(bodyParser.json());
var fs = require('fs');
var data = fs.readFileSync('games.json');
var data2 = fs.readFileSync('games2.json');

var gamesList = JSON.parse(data);
var gamesList2 = JSON.parse(data2);

router.post('/', function(req, res){
  console.log("input -> ", req.body);
  var input =JSON.stringify( req.body );
  var inputArray = input.split("!")
  var game = {
    name: inputArray[1],
    nameNext : inputArray[2],
    studio : inputArray[3],
    type : inputArray[4],
    data: inputArray[5],
    desr: inputArray[6],
    pictures: inputArray[7],
    id: inputArray[8],
  }
  gamesList2.push(game);
  var data = JSON.stringify(gamesList2);
  fs.writeFile('games2.json', data, finished);
  function finished( err)
  {
    console.log('all done');
  }

  });



router.get('/', function(req, res, next) {
   res.render('index', { title, condition: true, anyArray: [1,2,3] });
 });


 router.get('/game/all/', (req, res, next) =>{
  res.json({
    gamesList2
 })
 });

 router.get('/game/name/', (req, res, next) =>{
   var nameTab = [];
   var i;
   for (i = 0; i < gamesList2.length; i++) {
   nameTab.push(gamesList2[i].name);
  }   
  res.json({
    nameTab
 })
 });

 router.get('/game/all2/', (req, res, next) =>{
  res.json({
    gamesList2
 })
 });

 router.get('/game/:id?', (req, res, next) =>{
  var data = req.params;
  var id = data.id;
  console.log("get game id: ",id);
  var game = (gamesList2[id])

  res.json({
   game
 })


 });

 router.get('/add/:game',addGame);

 function addGame (req,res){
  var data = req.params;
  var game = data.game;
  
  var reply;
  
  if( !game){
    reply = {
      msg: " Something is wrong"
    }
  }else {
    gamesList.push(game);
    var data = JSON.stringify(gamesList);
    console.log(data);;
    fs.writeFile('games.json', data, finished);
  
    function finished( err)
    {
      console.log('all set');
    }
  
  reply={
    msg: "all done"
  }
  }
  res.send(reply);
  
   }


router.get('/delete/:id',deleteGame);

function deleteGame(req,res){
  var data = req.params;
  var id = data.id;

  var reply;
  gamesList.splice(id,1);
  var data = JSON.stringify(gamesList);
  console.log(data);;
  fs.writeFile('games.json', data, finished);

  function finished( err)
  {
    console.log('all set');
  }

reply = {
    msg: " deleted "
  }
  res.send(reply);
}


router.get('/put/:id/:game', editGame);
function editGame(req,res){
  var data = req.params;
  var id = data.id;
  var game = data.game;

  var reply;
  console.log(id);;
  console.log(game);;

  gamesList.splice(id,1);
  gamesList.push(game);
  var data = JSON.stringify(gamesList);
  fs.writeFile('games.json', data, finished);


  function finished( err)
  {
    console.log('all set');
  }

reply = {
    msg: " deleted "
  }
  res.send(reply);
}


 

module.exports = router;