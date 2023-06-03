
let GrassEater = require('./grassEater')



module.exports =class Predator extends GrassEater{
    constructor(x, y)
     {
        super(x,y);
        this.energy = 20;
    }
    mul() {
        let newCell = this.random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            let predator = new Predator(x, y);
            PredatorArr.push(predator);
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < PredatorArr.length; i++) {
            if (PredatorArr[i].x == this.x && PredatorArr[i].y == this.y) 
            {
                PredatorArr.splice(i, 1)
            }
        }
    }
    eat() {
        this.getNewDirections();
        let newCell = this.random(this.chooseCell(1));
        let newCell2 = this.random(this.chooseCell(2));
        let newCell5 = this.random(this.chooseCell(5));
        if (newCell) 
        {
            this.energy += 2;
            let x = newCell[0];                                            
            let y = newCell[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
       
            if(this.energy > 24)
            {
                this.mul()
            }
        }
        else if (newCell2) 
        {
            this.energy += 3;
            let x = newCell2[0];                                            
            let y = newCell2[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
       
            if(this.energy > 24)
            {
                this.mul()
            }
        }
        else if (newCell5) 
        {
            this.energy += 3;
            let x = newCell5[0];                                            
            let y = newCell5[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let i = 0; i < SoldierArr.length; i++) {
                if (SoldierArr[i].x == x && SoldierArr[i].y == y) {
                    SoldierArr.splice(i, 1)
                }
            }
       
            if(this.energy > 24)
            {
                this.mul()
            }
        }
        else { this.move() }
    }
    move(){
        this.energy--;
        let newCell = this.random(this.chooseCell(0));
        if (newCell)
         {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }
        if (this.energy < 0)
        {
            this.die();
        }
    }
}