class Ghost{

    constructor(mouseX, mouseY){
        let columnCount = 9;
        let rowCount = 4;
        let refreshDelay = 50;
        let scale = 1.5;
        let loopColumn = true;

        this.tiledImage = new TiledImage("img/Ghost.png", columnCount, rowCount, refreshDelay, loopColumn, scale);
        this.tiledImage.changeRow(1);
        this.tiledImage.changeMinMaxInterval(0,7);

        this.x = mouseX+100;
        this.y = mouseY+100;

        this.mousePosX = mouseX;
        this.mousePosY = mouseY;

        this.speed = 3;

        this.deathAnim = 0;

       
    }

    tick(ctx, mousePosX, mousePosY){
        let alive = true;

        if(mousePosX > this.x){
            this.x += this.speed;

            this.tiledImage.setFlipped(false);
        }
        else if(mousePosX <= this.x){
            this.x -= this.speed;
            this.tiledImage.setFlipped(true);
        }

        if(mousePosY >= this.y){
            this.y += this.speed;
            
        }
        else if(mousePosY < this.y){
            this.y -= this.speed;
             
        }

        if(this.x < mousePosX && this.x + 50 > mousePosX && this.y < mousePosY && this.y + 50 > mousePosY){
            
            alive = false;
            
        }

        this.tiledImage.tick(this.x, this.y, ctx);

        return alive;

    }
}