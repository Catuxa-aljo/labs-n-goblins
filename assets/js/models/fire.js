class DeathFire{
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.isVisible = true
    
        this.w = 40;     
        this.h = 55;
        this.x = x;
        this.y = y;

        this.vx = -5
        this.vy = -1
        this.g = 0.1

        this.strength = 2
      

        this.img = new Image();
        this.img.src = './assets/img/fire.gif';
        
       

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
            this.x > 0 - this.ctx.canvas.width &&
            this.y < this.ctx.canvas.height
          )
    }
}