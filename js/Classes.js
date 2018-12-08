class Circle {
    constructor(x, y, radius, thin = 5, fill = false) {
        this.x = x;
        this.y = y;
        this.thin = thin;
        this.radius = radius;
        this.fill = fill;
        this.angle = 0;
        this.speed = 0;
        this.turn = 1;
        this.newturn = false;
    }

    turnAround(point, distance, increment = 1) {
        this.newturn = false;
        this.angle += increment * this.speed;
        if (Math.abs(Math.floor(this.angle / 360)) > this.turn) {
            this.newturn = true;
            this.turn++;
        }
        this.x = point.x + distance * Math.cos(this.angle * Math.PI / 180);
        this.y = point.y + distance * Math.sin(this.angle * Math.PI / 180);
    }

    stickTo(circle) {
        this.x = circle.x;
        this.y = circle.y;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.lineWidth = this.thin;
        if (this.fill === true) {
            clearCircle(this.x, this.y, this.radius);
        }
        ctx.strokeStyle = 'grey';
        ctx.stroke();
        ctx.closePath();
    }
}

class Line {
    constructor(xa, ya, xb, yb, thin = 5) {
        this.xa = xa;
        this.ya = ya;
        this.thin = thin;
        this.xb = xb;
        this.yb = yb;
        this.speed = 0;
        this.angle = 0;
    }
    setAngle(point, distance)
    {
        this.xa = point.x + distance * Math.cos(this.angle * Math.PI / 180);
        this.ya = point.y + distance * Math.sin(this.angle * Math.PI / 180);
        this.xb = point.x - distance * Math.cos(this.angle * Math.PI / 180);
        this.yb = point.y - distance * Math.sin(this.angle * Math.PI / 180);
    }

    turnOn(point, distance, increment = 1) {
        this.angle += increment * this.speed;
        this.xa = point.x + distance * Math.cos(this.angle * Math.PI / 180);
        this.ya = point.y + distance * Math.sin(this.angle * Math.PI / 180);
        this.xb = point.x - distance * Math.cos(this.angle * Math.PI / 180);
        this.yb = point.y - distance * Math.sin(this.angle * Math.PI / 180);
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.xa, this.ya);
        ctx.lineTo(this.xb, this.yb);
        ctx.lineWidth = this.thin;
        ctx.strokeStyle = 'grey';
        ctx.stroke();
        ctx.closePath();
    }
}
