class Bullet {
    constructor(position, fwd, bulletType) {
        this.position = position;
        this.fwd = fwd;
        this.radius = 3;
        this.shouldRemove = false;
        this.bulletType = bulletType; //0 is a player bullet, 1 is an enemy bullet
    }

    update(dt) {
        this.position.addScalar(this.fwd, 5);

        //check for collisions
        if(this.bulletType == 0)
        {
            enemies.forEach(enemy => {

                if(CircleCollision(this.position.x, this.position.y, this.radius, enemy.position.x, enemy.position.y, enemy.radius))
                {
                    //delete enemy and bullet
                    bullets.splice(bullets.indexOf(this), 1);
                    enemies.splice(enemies.indexOf(enemy), 1);
                    console.log("hit enemy");
                }

            })

            asteroids.forEach(asteroid => {

                if(CircleCollision(this.position.x, this.position.y, this.radius, asteroid.x, asteroid.y, asteroid.radius))
                {
                    //delete enemy and bullet
                    bullets.splice(bullets.indexOf(this), 1);
                    asteroids.splice(asteroids.indexOf(asteroid), 1);
                    console.log("hit enemy");
                }

            })
        }
        else if(this.bulletType == 1)
        {
            if(CircleCollision(this.position.x, this.position.y, this.radius, player.position.x, player.position.y, player.radius))
                {
                    //delete enemy and bullet
                    bullets.splice(bullets.indexOf(this), 1);
                    //delete or damage player
                    console.log("hit player");
                }
        }
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