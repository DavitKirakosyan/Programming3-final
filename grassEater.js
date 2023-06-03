
let Grass = require('./grass')

module.exports = class GrassEater extends Grass {
    constructor(x, y)
     {
        super(x,y);
        this.energy = 20;
    }
    getNewDirections(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    mul() {
        let newCell = this.random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
            let grassEater = new GrassEater(x, y);
            grassEaterArr.push(grassEater);
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) 
            {
                grassEaterArr.splice(i, 1)
            }
        }
    }
    eat() {
        this.getNewDirections();
        let newCell = this.random(this.chooseCell(1));
        if (newCell) 
        {
            this.energy += 2;
            let x = newCell[0];                                            
            let y = newCell[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
       
            if(this.energy > 20)
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
            matrix[y][x] = 2;
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