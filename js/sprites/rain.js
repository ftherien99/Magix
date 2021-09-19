class RainDrop {

    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = this.size/0.5; 
    }

    tick(ctx, mousePosX, mousePosY) {
        let alive = true;

        this.y += 10;

        ctx.fillStyle = "grey";
        ctx.fillRect(this.x, this.y, 6, 10);


        if (this.y > canvas.height) {
            alive = false;
        }

        return alive;
    }
}