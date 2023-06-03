let grasskill =0;
let grassEaterkill =0;
let Predatorkill =0;
let Castlekill =0;
let Soldierkill =0;
let Tavernkill = 0;


var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

let Grass = require('./grass');
let GrassEater = require('./grassEater');
let Predator = require('./Predator');
let Castle = require('./Castle');
let Soldier = require('./soldier');
let Tavern = require('./tavern');

grassArr = [];
matrix = [];
grassEaterArr = [];
PredatorArr = [];
CastleArr = [];
SoldierArr = [];
TavernArr = [];

let grassmsg


function randomNum(min,max){
   let result = Math.floor(Math.random()* (max+min) -min);
   return result;
}





function createMatrix(){
   function matrixGenerator(matrixSize, grassCount, grassEaterCount,PredatorCount,CastleCount,TavernCount) {
      for (let i = 0; i < matrixSize; i++) {
          matrix[i] = [];
          for (let j = 0; j < matrixSize; j++) {
              matrix[i][j]= 0;
          }
      }
      for (let i = 0; i < grassCount; i++) {
          let x = randomNum(0,matrixSize);
          let y = randomNum(0,matrixSize);
          matrix[y][x]= 1;
      }
      for (let i = 0; i < grassEaterCount; i++) {
          let x = randomNum(0,matrixSize);
          let y = randomNum(0,matrixSize);
          matrix[y][x]= 2;
      }
      for (let i = 0; i < PredatorCount; i++) {
          let x = randomNum(0,matrixSize);
          let y = randomNum(0,matrixSize);
          matrix[y][x]= 3;
      }
      for (let i = 0; i < CastleCount; i++) {
          let x = randomNum(0,matrixSize);
          let y = randomNum(0,matrixSize);
          matrix[y][x]= 4;
      }
      for (let i = 0; i < TavernCount; i++) {
        let x = randomNum(0,matrixSize);
        let y = randomNum(0,matrixSize);
        matrix[y][x]= 6;
    }
   }
   matrixGenerator(12, 14, 4,6,1,3);
   
   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
          if (matrix[y][x] == 1) {
              let gr = new Grass(x, y);
              grassArr.push(gr);
          }
          else if (matrix[y][x] == 2) {
              let grassEater = new GrassEater(x, y);
              grassEaterArr.push(grassEater);
          }
          else if (matrix[y][x] == 3) {
              let predator = new Predator(x, y);
              PredatorArr.push(predator);
          }
          else if (matrix[y][x] == 4) {
              let castle = new Castle(x, y);
              CastleArr.push(castle);
          }
          else if (matrix[y][x] == 5) {
              let soldier = new Soldier(x, y);
              SoldierArr.push(soldier);
          }
          else if (matrix[y][x] == 6) {
            let tavern = new Tavern(x, y);
            TavernArr.push(tavern);
        }
      }
   }

}
function playGame(){
   for (let i in grassArr) {
      grassArr[i].mul();
   }
   for (let i in grassEaterArr) {
      grassEaterArr[i].eat();
   }
   for (let i in PredatorArr) {
      PredatorArr[i].eat();
   }
   for (let i in CastleArr) {
      CastleArr[i].destroy();
   }
   for (let i in SoldierArr) {
      SoldierArr[i].kill();
   }
   for (let i in TavernArr) {
    TavernArr[i].replace();
 }
 grassmsg=[grassArr.length];
 io.emit("grasskill",grasskill);
 io.emit("grassEaterkill",grassEaterkill);
 io.emit("Predatorkill",Predatorkill);
 io.emit("Castlekill",Castlekill);
io.emit("Soldierkill",Soldierkill);
io.emit("Tavernkill",Tavernkill);
 io.emit("grassmsg",grassmsg);
   io.emit("matrix",matrix);
   return matrix;
}
let interval=1000;

setInterval(playGame,interval);
createMatrix();

    
io.on("connection",function(socket){
   socket.emit("matrix",matrix);
   socket.on("winter",function(){
    interval =1500;
   })
   socket.on("summer",function(){
    interval=600;
   })
   socket.on("normal",function(){
    interval =1000;
   })
   socket.on("start",function(){
        let y = randomNum(0,matrix.length);
        for(let x=0;x<matrix.length;x++){
         if(matrix[y][x]==1){
            for(let i=0;i<grassArr.length;i++){
                if(grassArr[i].x==x && grassArr[i].y==y){
                    grassArr.splice(i,1);
                    console.log("barev1")
                    grasskill++;
                }
            }
            
             matrix[y][x]=0;
         }
         else if(matrix[y][x]==2){
            for(let i=0;i<grassEaterArr.length;i++){
                if(grassEaterArr[i].x==x && grassEaterArr[i].y==y){
                    grassEaterArr.splice(i,1);
                    console.log("barev2")
                    grassEaterkill++;
                }
            }
             matrix[y][x]=0;
         }
         else if(matrix[y][x]==3){
            for(let i=0;i<PredatorArr.length;i++){
                if(PredatorArr[i].x==x && PredatorArr[i].y==y){
                    PredatorArr.splice(i,1);
                    console.log("barev3")
                    Predatorkill++;
                }
            }
             matrix[y][x]=0;
         }
         else if(matrix[y][x]==4){
            for(let i=0;i<CastleArr.length;i++){
                if(CastleArr[i].x==x && CastleArr[i].y==y){
                    CastleArr.splice(i,1);
                    Castlekill++;
                    console.log("barev4")
                }
            }
             matrix[y][x]=0;
         }
         else if(matrix[y][x]==5){
            for(let i=0;i<SoldierArr.length;i++){
                if(SoldierArr[i].x==x && SoldierArr[i].y==y){
                    SoldierArr.splice(i,1);
                    Soldierkill
                    console.log("barev5")
                }
            }
             matrix[y][x]=0;
         }
         else if(matrix[y][x]==6){
            for(let i=0;i<TavernArr.length;i++){
                if(TavernArr[i].x==x && TavernArr[i].y==y){
                    TavernArr.splice(i,1);
                    Tavernkill++;
                    console.log("barev6")
                }
            }
             matrix[y][x]=0;
         }
         
        }
        return matrix;
   })
}) 



 

