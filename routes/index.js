const express = require('express');
const router = express.Router();
const title = "GameNews";
var fs = require('fs');
var data = fs.readFileSync('games.json');
var gamesList = JSON.parse(data);



router.get('/', function(req, res, next) {
   res.render('index', { title, condition: true, anyArray: [1,2,3] });
 });


 router.get('/game/all/', (req, res, next) =>{
  res.json({
    gamesList
 })
 });

 router.get('/game/:id?', (req, res, next) =>{
  var data = req.params;
  var id = data.id;
  console.log(id);
  var game = (gamesList[id])

  res.json({
   game
 })


 });

 router.get('/add/:game',addGame);
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

module.exports = router;