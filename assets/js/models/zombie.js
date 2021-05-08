class Zombie{
    constructor(ctx){
        this.ctx = ctx
            this.dist = Math.random() * (8000 - 1000) + 1000;
            this.x = Math.random() > 0.5 ? 0 - this.dist : this.dist
            this.y = 370;
            this.w = 126;
            this.h = 148;
    
            this.health = 4;
            this.lifew = 30 * this.health;
            this.lifew2 = 30 * this.health;
            this.lifeh = 8;
    
            this.vx = -3;
            
    
            this.img = new Image();
            this.img.src = './assets/img/zombie.png';
            this.img.drawCount = 0;
            this.img.frames = 8;
            this.img.frameIndex = 0;

            this.hurtingZombie = new Audio('./assets/sounds/hurting-zombie.wav')

            this.canReceiveDamage = true
    }

    draw(){

        this.img.drawCount++
        if (this.img.drawCount >= 10) {
            this.animate();
            this.img.drawCount = 0
        }
        //const life = new MonsterLife(this.ctx, this.x , this.y - 10, 100, 10 )
        //life.draw()

        
        this.ctx.fillStyle = '#5d0926'
        this.ctx.fillRect(
            this.x + 20,
            this.y,
            this.lifew2,
            this.lifeh
        )

        this.ctx.fillStyle = '#ff3066'
        this.ctx.fillRect(
            this.x + 20,
            this.y,
            this.lifew,
            this.lifeh
        )
       

        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / 8,
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
        this.hurtingZombie.play()
        this.health = this.health - damage;   
        this.x = this.x + 20  
        this.lifew = this.lifew - this.lifew/this.health       
               
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