class Bullet {
    constructor(position, fwd) {
        this.position = position;
        this.fwd = fwd;
        this.radius = 3;
        this.shouldRemove = false;
    }

    update(dt) {
        this.position.addScalar(this.fwd, 5);

        //check for collisions
        enemies.forEach(enemy => {
            let minDist = this.radius + enemy.radius;
            let distance = enemy.position.dist2(this.position);

            //if we get a collision
            if (distance < minDist * minDist) {
                //delete enemy
                for(let i = enemies.length - 1; i > -1; i--)
                {
                    enemies.splice(i, 1);
                }
                //delete bullet
                for(let i = bullets.length - 1; i > -1; i--)
                {
                    bullets.splice(i, 1);
                }

                console.log("hit");
            }
        })
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }








}