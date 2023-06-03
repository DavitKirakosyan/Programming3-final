
let Grass = require('./grass')
let Soldier = require('./soldier')


module.exports = class Castle extends Grass{
    constructor(x, y)
     {
         super(x,y);
        this.energy = 10;  
    }

    mul() {
        let newCell = this.random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            let soldier = new Soldier(x, y);
            SoldierArr.push(soldier);
        }
    }
    destroy(){
        let newCell3 = this.random(this.chooseCell(3));
        if(newCell3){
            let x = newCell3[0];                                            
            let y = newCell3[1];

            matrix[y][x] = 0
            for (let i = 0; i < PredatorArr.length; i++) {
                if (PredatorArr[i].x == x && PredatorArr[i].y == y) {
                    PredatorArr.splice(i, 1);
                }
            }
            
            this.mul();

        }
    }
}