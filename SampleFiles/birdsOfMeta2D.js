const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
    dimensions: [1960, 1080],
    animate: true
};

const sketch = ({ width, height }) => {
    const posArray = [];
    let circNum = 30;
    for (let i = 0; i < circNum; i++) {
        let x = random.range(0, width);
        let y = random.range(0, height);
        console.log(x, y);
        posArray.push(new Circle(x, y));
    }
    return ({ context, width, height }) => {
        const bgcolor = new Circle(width, height);
        var grd2 = context.createLinearGradient(0, 0, width, height);
        grd2.addColorStop(0, '#ffff66');
        grd2.addColorStop(1, '#cc99ff');
        context.fillStyle = grd2;
        context.fillRect(0, 0, width, height);
        context.fillStyle = 'black';
        context.font = '40px Helvetica Neue';
        context.fillText("@vish4life", width - 250, height - 50);
        posArray.forEach(Circle => {
            Circle.move();
            Circle.color(context);
            Circle.draw(context);
            Circle.bounce(width, height);
        });
    };
};

canvasSketch(sketch, settings);

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getDistance(v) {
        let dx = this.x - v.x;
        let dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

class Circle {
    constructor(x, y) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(random.range(-2, 2), random.range(-2, 2));
        this.raidus = random.range(10, 30);
    }
    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    bounce(width, height) {
        if (this.position.x <= 100 || this.position.x >= width - 200) {
            this.position.x = width / 2;

        }
        if (this.position.y <= 100 || this.position.y >= height - 200) {
            this.position.y = height / 2;
        }
    }
    draw(context) {
        context.save();
        context.strokeStyle = 'white';
        context.lineWidth = 4;
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(0, 0, this.raidus, 0, Math.PI * 2);
        context.arc(0, 0, random.range(50, 60), random.range(-1, 1), random.range(0, Math.PI));
        context.fill();
        context.stroke();
        context.restore();
    }
    color(context) {
        var colorarray = [];
        for (let j = 0; j < 2; j++) {
            let hexvals = ['A', 'B', 'C', 'D', 'E', 'F', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            let color1 = random.pick(hexvals);
            let color2 = random.pick(hexvals);
            let color3 = random.pick(hexvals);
            let color4 = random.pick(hexvals);
            let color5 = random.pick(hexvals);
            let color6 = random.pick(hexvals);
            let color = '#' + color1 + color2 + color3 + color4 + color5 + color6;
            colorarray.push(color);
        };
        var grd = context.createLinearGradient(0, 0, this.position.x, this.position.y);
        for (let m = 0; m < colorarray.length; m++) {
            grd.addColorStop(m, colorarray[m]);
        };
        context.fillStyle = grd;
        context.strokeStyle = grd;
    }
}
