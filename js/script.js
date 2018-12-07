var canvas;
var ctx;

window.onload = function () {

    canvas = document.getElementById("logo");
    ctx = canvas.getContext("2d");
    let raf = window.requestAnimationFrame(draw);
    let circles = init();

    function draw() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animate(circles);
        for (let circle in circles) {
            circles[circle].draw();
        }
        raf = window.requestAnimationFrame(draw);
    }
};

function init() {
    let mx = canvas.width / 2;
    let my = canvas.height / 2;
    const ratio = canvas.height;
    let circles = {
        c3: new Circle(mx, my, ratio * 0.35, ratio * 0.009),
        l1: new Line(0, 0, 0, 0, ratio * 0.005),
        c3a: new Circle(0, 0, ratio * 0.148, ratio * 0.0025, true),
        a1: new Circle(0, 0, ratio * 0.09, ratio * 0.0025),
        c3b: new Circle(0, 0, ratio * 0.096, ratio * 0.009, true),
        b1: new Circle(0, 0, ratio * 0.08, ratio * 0.0025),
        c1: new Circle(mx, my, ratio * 0.49, ratio * 0.02),
        c2: new Circle(mx, my, ratio * 0.44, ratio * 0.02),
        c4: new Circle(mx, my, ratio * 0.17, ratio * 0.009, true),
        c4a: new Circle(mx, my, ratio * 0.025, ratio * 0.0025, true),
        c6: new Circle(mx, my, ratio * 0.09, ratio * 0.009),
        l2: new Line(0, 0, 0, 2, ratio * 0.005),
        c5: new Circle(mx, my, ratio * 0.13, ratio * 0.0025),
        c7: new Circle(mx, my, ratio * 0.045, ratio * 0.0025, true),
        c8: new Circle(mx, my, ratio * 0.02, ratio * 0.0025, true),
    };
    for (let circle in circles) {
        circles[circle].speed = 1;
    }
    circles.c3a.turnAround(circles.c3, circles.c3.radius, 220);
    circles.c3b.turnAround(circles.c3, circles.c3.radius, 20);
    circles.c4a.turnAround(circles.c4, circles.c4.radius, 50);
    circles.a1.stickTo(circles.c3a);
    circles.b1.stickTo(circles.c3b);
    circles.l1.turnOn(circles.c3, circles.c3.radius, 320);
    circles.l2.turnOn(circles.c6, circles.c6.radius, 90);
    for (let circle in circles) {
        circles[circle].speed = 0;
    }
    return circles;
}

function animate(circles) {
    circles.c3a.turnAround(circles.c3, circles.c3.radius);
    circles.c3a.speed = 0.5;
    circles.c3b.turnAround(circles.c3, circles.c3.radius);
    circles.c3b.speed = 0.5;
    circles.c4a.turnAround(circles.c4, circles.c4.radius);
    circles.c4a.speed = -1;

    circles.a1.stickTo(circles.c3a);
    circles.b1.stickTo(circles.c3b);
    clock_animation(circles);


}

let target = 0;


function clock_animation(circles) {

    let distance = circles.l1.angle - circles.c3a.angle;

    if (distance < 50)
        target = 120.0;
    if (distance > target) {
        target = 0;
        circles.l1.speed = 0;
    }
    if (target) {
        circles.l1.turnOn(circles.c3, circles.c3.radius);
        if (circles.l1.speed !== 1.1)
            circles.l1.speed += 0.1;
    }
   l2_animation(circles);
    // console.log( circles.l2.angle);


}
let spin = 0;
function l2_animation(circles)
{
    if (circles.c4a.newturn === true) {
        console.log(circles.l2.angle);

        spin = circles.l2.angle;
    }
    if (spin) {
        if (circles.l2.angle > spin + 360) {
            circles.l2.angle = spin + 360;
            circles.l2.setAngle(circles.c6, circles.c6.radius);
            spin = 0;
            circles.l2.speed = 0;
            console.log("reset");


        } else {
            console.log("animate");
            circles.l2.turnOn(circles.c6, circles.c6.radius);
            if (circles.l2.speed !== 1)
                circles.l2.speed += 0.1;
        }
    }
}

function clearCircle(x, y, radius) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
}
