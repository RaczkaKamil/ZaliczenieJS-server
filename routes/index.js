const express = require('express');
const router = express.Router();
const title = "GameNews";
var arrayGame = [];
arrayGame.push("#World of Warfraft!https://www.blizzard.com/static/_images/games/wow/wallpapers/wall1/wall1-1600x1200.jpg!Blizzard*MMORPG@Jej akcja toczy się cztery lata po wydarzeniach przedstawionych w grze Warcraft III: The Frozen Throne, w świecie stworzonym w 1994 roku na potrzeby Warcraft: Orcs & Humans. World of Warcraft jest czwartą (nie licząc dodatków) grą w uniwersum Warcrafta");
arrayGame.push("#World of Tanks!https://i.wpimg.pl/O/644x361/d.wpimg.pl/169371567--387763345/world-of-tanks.png!Wargaming.net*MMO,symulacyjna,zręczościowa*Rozgrywka skupia się na bitwach pancernych pomiędzy graczami w interakcji player versus player z wykorzystaniem różnego typu wozów bojowych. Gracz ma do dyspozycji ponad 450 pojazdów: czołgów (lekkich, średnich, ciężkich), artylerii samobieżnej, pojazdów kołowych oraz niszczycieli czołgów z okresu od I wojny światowej aż po wczesną zimną wojnę, pochodzących ze Stanów Zjednoczonych, Czechosłowacji, ZSRR, III Rzeszy, Francji, Wielkiej Brytanii, Chin, Japonii, Szwecji, Włoch i Polski");
arrayGame.push("#Metin2!https://cdn.gracza.pl/galeria_tv/hots/N640/296_280923324.jpg!Ymir Entertainment*MMORPG*Fabuła gry umiejscowiona jest w świecie fantasy inspirowanym kulturą Dalekiego Wschodu. „Kamienie Metin”, które spadły na ziemię spowodowały chaos w krainie, wojny pomiędzy królestwami oraz ataki zwierząt i potworów. Celem gry jest walka ze skutkami mrocznego wpływu kamieni.  ");
arrayGame.push("#League of Legends!https://gamingsociety.pl/wp-content/uploads/2018/10/LoL.jpg!Riot Games*MOBA*sieciowa gra komputerowa z gatunku multiplayer online battle arena[13]. Powstała na bazie modyfikacji Defense of the Ancients (DotA) do Warcraft III: The Frozen Throne. Opracowana przez firmę Riot Games i początkowo wydana tylko dla systemu Windows. Została zapowiedziana 7 października 2008, a wydana 27 października 2009[6]. 15 lipca 2013 gra została uznana w USA za pełnoprawny sport  ");
router.get('/', function(req, res, next) {
   res.render('index', { title, condition: true, anyArray: [1,2,3] });
 });


 router.get('/test/:id', function(req, res, next) {
   res.render('test', {output: req.params.id});
 });
 
 router.get('/game/all/', (req, res, next) =>{
  res.json({
arrayGame
 })
 });


 router.get('/test2/', (req, res, next) =>{
 res.json({
    'status': 'sukces',
    'status2': 'sukces2'
 })
 });
 
 router.post('/test/submit', function(req, res, next) {
   res.redirect('/test/');
 });


module.exports = router;