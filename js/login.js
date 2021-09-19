let canvas = null;
let ctx = null;
let spriteList = [];
let landscape = null;
let mousePosX = null;
let mousePosY = null;

window.addEventListener("load", () => {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    document.getElementById("canvas").onmousemove = event => {
		mousePosX = event.pageX;
        mousePosY = event.pageY;
    }
    
    document.querySelector("canvas").onmousedown = event =>{
        
        spriteList.push(new Ghost(mousePosX, mousePosY));
    }

    
    tick();
});



const tick = () => {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    if (Math.random() < 0.2) { // 10% de chance
        spriteList.push(new RainDrop());
    }

    for (let i = 0; i < spriteList.length; i++) {
        const element = spriteList[i];
        let alive = element.tick(ctx, mousePosX, mousePosY);

        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }
    
    //console.log(spriteList.length);
    window.requestAnimationFrame(tick);
}