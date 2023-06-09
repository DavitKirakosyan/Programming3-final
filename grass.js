
module.exports=class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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
    chooseCell(character) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }

        }
        return found;
    }
    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = this.random(emptyCells);
        
        
        if (newCell && this.multiply >= 8) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;

            let newGrass = new Grass(x, y);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
random(arr){
    let result = Math.floor(Math.random() * arr.length)
    return arr[result]
}
}