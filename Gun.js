class Gun {
    constructor(x, y, radX, radY, speed, rotation) {
        this.position = new Vec2(x, y);
        this.radX = radX;
        this.radY = radY;
        this.fwd = Vec2.fromAngle(rotation);
        this.speed = speed;
    }

    update(dt) {
        // this moves the gun
        // this.position.addScalar(this.fwd, this.speed * dt);
    }

    shoot() {
        bullets.push(
            new Bullet(
                this.position.clone(),
                this.fwd.clone()
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