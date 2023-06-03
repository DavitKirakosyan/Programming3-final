let Grass = require('./grass');
let Soldier = require('./soldier');
module.exports = class Tavern extends Grass{
    constructor(x, y)
    {
        super(x,y);
       this.energy = 10;  
   }
    replace(){
                    let newCell = this.random(this.chooseCell(5));
                    if (newCell) {
                        let x = newCell[0];
                        let y = newCell[1];
                        for(let i=0;i<SoldierArr.length;i++){
                            if(SoldierArr[i].x==x && SoldierArr[i].y==y){
                                SoldierArr.splice(i,1)
                            }
                        }
                        matrix[y][x] = 5;
                        let soldier = new Soldier(x, y);
                        SoldierArr.push(soldier);
                    }  
            }
}