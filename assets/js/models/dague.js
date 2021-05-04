class Dague{
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.isVisible = true
    
        this.w = 60;     
        this.h = 19;
        this.x = x;
        this.y = y;

        this.vx = 2
        this.vy = 0
        this.g = 0

        this.strength = 1
      

        this.img = new Image();
        this.img.src = './assets/img/dague.png';
        
       

    }

    draw(){

        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        ) 
    }

    move(){      
        this.vy += this.g
        this.x += this.vx 
        this.y += this.vy
    
       
      
      
    }

    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w;
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y;
    
        
        return collideX && collideY;
      }


    isVisible(){
        return (
            this.x < this.ctx.canvas.width * 2 &&
            this.x > 0 - this.ctx.canvas.width
          )
    }
}