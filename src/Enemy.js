class Enemy {
    constructor(x, y, radius, speed, rotation, waypointIndex) {
        this.position = new Vec2(x, y);
        this.radius = radius;
        this.speed = speed;
        this.fwd = Vec2.fromAngle(rotation);
        this.waypointIndex = waypointIndex;
    }

    update(dt) {
        move();
    }

    move(dt){
        var dx = this.position.x - player.position.x;
        var dy = this.position.y - player.position.y;
        // var dy = this.position.x - waypoints[this.waypointIndex].position.y;


        var stepX = dx/(100 - this.speed);
        var stepY = dy/(100 - this.speed);

        this.position.x -= stepX;
        this.position.y -= stepY;

        //this.position = waypoints[0]
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }
}