class PlayerController {
    constructor(x, y, radius, speed, rotation, mode) {
        this.position = new Vec2(x, y);
        this.radius = radius;
        this.fwd = Vec2.fromAngle(rotation);
        this.speed = speed;
        this.mode = mode;
    }

    update(dt) {

    }

    rotate(angle){
        this.fwd.rotate(angle);
        //document.querySelector("#player").style.transform = "rotate(" + angle + "deg)";
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.fwd.getAngle());

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }
}