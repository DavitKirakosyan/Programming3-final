let socket = io();
let side = 50;


function setup() {
   
    frameRate(5);
    createCanvas(50* side, 50* side);
    background('#acacac');
  

}
socket.on("grassmsg",function(grassmsg){
  document.getElementById("grassmsg").innerText="Grass Count:"+grassmsg;
})
socket.on("grasskill",function(grasskill){
    document.getElementById("grasskill").innerText="Grass Destroyed:"+grasskill;
})
socket.on("grassEaterkill",function(grassEaterkill){
    document.getElementById("grassEaterkill").innerText="GrassEater Destroyed:"+grassEaterkill;
})
socket.on("Predatorkill",function(Predatorkill){
    document.getElementById("Predatorkill").innerText="Predator Destroyed:"+Predatorkill;
})
socket.on("Castlekill",function(Castlekill){
    document.getElementById("Castlekill").innerText="Castle Destroyed:"+Castlekill;
})
socket.on("Soldierkill",function(Soldierkill){
    document.getElementById("Soldierkill").innerText="Soldier Destroyed:"+Soldierkill;
})
socket.on("Tavernkill",function(Tavernkill){
    document.getElementById("Tavernkill").innerText="Tavern Destroyed:"+Tavernkill;
})
function drawMatrix(matrix) {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
             if (matrix[y][x] == 0) {
                fill("grey");
            }
            else if (matrix[y][x] == 1) {
                if(weather==1){
                    fill("green");
                }
                else if(weather==0){
                    fill("white");
                }
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("brown");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            else if (matrix[y][x] == 6) {
                fill("lightblue");
            }
            rect(x * side, y * side, side, side);
        }
    }
    
}

socket.on("matrix",function(matrix){
    drawMatrix(matrix);
});

 
function destroy(){
 
    socket.emit("start");
    
}
let weather=1;
function winter(){
    socket.emit("winter");
    weather=0;
    console.log("winter")
}
function summer(){
    socket.emit("summer");
    weather=1;
    console.log("summer")
}
function normal(){
    socket.emit("normal");
    weather=1;
    console.log("normal")
}
var p = document.getElementById("destroy");
p.addEventListener("click",destroy);

var winterbutton = document.getElementById("winter");
winterbutton.addEventListener("click",winter);

var summerbutton = document.getElementById("summer");
summerbutton.addEventListener("click",summer);

var normalbutton = document.getElementById("normal");
normalbutton.addEventListener("click",normal);