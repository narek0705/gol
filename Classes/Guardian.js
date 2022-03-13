class Guardian extends LivingCreature{

    constructor(x, y, id) {
        super(x,y,id)
        this.energy = 12;
        this.license = 4;
    }

    getNewCoordinates() {
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
        this.getNewCoordinates();
        return super.chooseCell(character);
    }


    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.energy >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.id;

            var newGuardian = new Guardian(newX, newY, this.id);
            guardianArr.push(newGuardian);
            this.energy = 12;
            this.license = 4;
        }
    }

    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.energy > 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.id;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy--;
        }

        this.stop();

    }

    block() {
        var emptyCells = this.chooseCell(4);
        var newCell = random(emptyCells);

        if (newCell && this.energy > 0 && this.license > 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 0;
            this.energy++;
            this.license--;

            for (var i in hunterArr) {
                if (newX == hunterArr[i].x && newY == hunterArr[i].y) {
                    hunterArr.splice(i, 1);
                    break;
                }
            }

            this.mul();
        } else {
            this.move();
        }
        if (this.energy % 3 == 0) {
            this.license++;
        }
    }

    stop() {
        if (this.energy <= 0 || hunterArr.length == 0) {
            for (var i in guardianArr) {
                if (this.x == guardianArr[i].x && this.y == guardianArr[i].y) {
                    guardianArr.splice(i, 1);
                    break;
                }
            }

            matrix[this.y][this.x] = 0;
        }
    }
}