class Asteroid{
    constructor(x,y,radius,level,collisionRadius) {
        this.visible = true;
        this.x = x
        this.y = y
        this.speed = 3;
        this.radius = radius || 50;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeColor = 'white';
        this.collisionRadius = collisionRadius || 46;
        // Used to decide if this asteroid can be broken into smaller pieces
        this.level = level || 1;  
    }
    update(dt){
        let radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;


        //teleports objects back onto screen
        if (this.x < this.radius) {
            this.x = canvas.width;
        }
        if (this.x > canvas.width) {
            this.x = this.radius;
        }
        if (this.y < this.radius) {
            this.y = canvas.height;
        }
        if (this.y > canvas.height) {
            this.y = this.radius;
        }

        if(CircleCollision(this.x, this.y, this.radius, 
            player.position.x, player.position.y, player.radius))
            {
                ctx.fillStyle = 'black';
                ctx.font = '50px Arial';
                ctx.fillText("GAME OVER", canvas.width / 2 - 150, canvas.height / 2);
                console.log("collision");
            }
    }
    draw(ctx){
        ctx.save();
        //ctx.translate(this.x, this.y);

        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 6);
        var radians = this.angle / Math.PI * 180;
        for(let i = 0; i < 6; i++){
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }
}