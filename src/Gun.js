class Gun {
    constructor(x, y, radX, radY, speed, rotation) {
        this.position = new Vec2(x, y);
        this.radX = radX;
        this.radY = radY;
        this.fwd = Vec2.fromAngle(rotation);
        this.speed = speed;
        // this.delay = 3000;
        // this.interval = this.setInterval(this.shoot, this.delay);
    }

    update(dt) {
        // this moves the gun
        // this.position.addScalar(this.fwd, this.speed * dt);
        //setTimeout(this.shoot(), 3000);
    }

    shoot() {
        bullets.push(
            new Bullet(
                this.position.clone(),
                this.fwd.clone(),
                0 //0 is a player bullet
            )
        );
    }

    rotate(angle){
        this.fwd.rotate(angle);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.fwd.getAngle());

        ctx.beginPath();
        //xpos, ypos, radx, rady, rot, startangle, endeng
        ctx.ellipse(0, 0, this.radX, this.radY, 0, 0, 2 * Math.PI);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }
}