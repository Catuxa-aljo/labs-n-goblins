class Skeleton{
    constructor(ctx){
        
            this.ctx = ctx
            this.dist = Math.random() * (5000 - 500) + 500;
            this.x = Math.random() > 0.5 ? 0 - this.dist : this.dist
            this.y = 360;
            this.w = 103;
            this.h = 150;
    
            this.health = 3;
    
            this.vx = -3;
            
    
            this.img = new Image();
            this.img.src = './assets/img/skeleton.png';
            this.img.drawCount = 0;
            this.img.frames = 4;
            this.img.frameIndex = 0;

            this.canReceiveDamage = true
    }

    draw(){

        this.img.drawCount++
        if (this.img.drawCount >= 50) {
            this.animate();
            this.img.drawCount = 0
        }


        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / 4,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )


    }

    animate(){
        this.img.frameIndex++

        if (this.img.frameIndex >= this.img.frames) {
          this.img.frameIndex = 0
        }
    }

    move(){

        this.x += this.vx
    }

    receiveDamage(damage){
        this.health = this.health - damage;   
        this.x = this.x + 10    
        
        
    }

    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w;
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y;

        if (collideX && collideY && this.canReceiveDamage){

        
         this.canReceiveDamage = false
        
        setTimeout(() => {
            this.canReceiveDamage = true
        }, 5000)

        return collideX && collideY;
    }
    
    return false
    
  }

      
    isVisible(){
        return (
            this.x < this.ctx.canvas.width * 2 &&
            this.x > 0 - this.ctx.canvas.width
          )
    }

    
}