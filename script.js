var matrix = [];

var grassArr = [];
var grassEaterArr = [];
var eaterArr = [];
var hunterArr = [];
var guardianArr = [];
var waterMachineArr = [];

var side = 25;


function setup() {
    matrix = generateMatrix(30);
    frameRate(3);
    createCanvas(side * matrix[0].length, side * matrix.length);
    background("#acacac");
    createObjects();
}

function draw() {
    for (y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("#5c2500");
            } else if (matrix[y][x] == 5) {
                fill("black");
            } else if (matrix[y][x] == 6) {
                fill("blue");
            } else {
                fill("#acacac");
            }
            rect(x * side, y * side, side, side)
        }
    }

    for (i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }

    for (i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
    }

    for (i = 0; i < eaterArr.length; i++) {
        eaterArr[i].eat();
    }

    for (i = 0; i < hunterArr.length; i++) {
        hunterArr[i].shoot();
    }

    for (i = 0; i < guardianArr.length; i++) {
        guardianArr[i].block();
    }

    if (hunterArr.length == 0) {
        for (i = 0; i < guardianArr.length; i++) {
            guardianArr[i].stop();
        }
    }

    for (i = 0; i < waterMachineArr.length; i++) {
        waterMachineArr[i].flood();
    }
}

function createObjects() {
    for (y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var g = new Grass(x, y, 1);
                grassArr.push(g);
            } else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                grassEaterArr.push(ge);
            } else if (matrix[y][x] == 3) {
                var e = new Eater(x, y, 3);
                eaterArr.push(e);
            } else if (matrix[y][x] == 4) {
                var h = new Hunter(x, y, 4);
                hunterArr.push(h);
            } else if (matrix[y][x] == 5) {
                var gu = new Guardian(x, y, 5);
                guardianArr.push(gu);
            } else if (matrix[y][x] == 6) {
                var wM = new WaterMachine(x, y, 6);
                waterMachineArr.push(wM);
            }
        }
    }
}

function generateMatrix(size) {
    var m = [];
    for (y = 0; y < size; y++) {
        m[y] = [];
        for (x = 0; x < size; x++) {
            var randomElement = random([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6, 6, 6, 6]);
            m[y][x] = randomElement;
        }
    }
    return m;
}


