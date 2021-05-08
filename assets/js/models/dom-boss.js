class EvilDome{
    constructor(ctx){
        this.ctx = ctx;

        this.isVisible = true

        this.x = this.ctx.canvas.width
        this.y = 260;
        this.w = 281
        this.h = 240
        this.health = 12;
        
        this.vx = -3;
        this.vy = 0;
  
        this.canReceiveDamage = true
        this.canShoot = true

        this.img = new Image();
        this.img.src = './assets/img/evil-dom.png';
        this.img.drawCount = 0;
        this.img.frames = 12;
        this.img.frameIndex = 0;

        this.deathFires = [];

        
        this.shootSound = new Audio('./assets/sounds/fireballs.wav')
        this.hurtingDom = new Audio('./assets/sounds/banshee-dom.mp3')

       
    }

    draw(){
        this.img.drawCount++

        if (this.img.drawCount >= 10) {
            this.animate();
            this.img.drawCount = 0
        }


        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / 12,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )

        this.deathFires.forEach(fire => fire.draw())
    }

    animate() {     
        this.img.frameIndex++
        
                    
             if (this.img.frameIndex >= this.img.frames) {
                    this.img.frameIndex = 0
             }
    }

    move(){
     
        this.x += this.vx 

        if(this.x <= this.ctx.canvas.width/2){
            this.x -= this.vx
        }
   
        this.deathFires.forEach(fire => fire.move()) 

    }

    attack(){
        
        const fire = new DeathFire(this.ctx, this.x , Math.random() * (this.ctx.canvas.height - this.h))
        this.shootSound.play()
        this.deathFires.push(fire) 
             
    }

    receiveDamage(damage){
        this.hurtingDom.play()       
        this.health = this.health - damage;   
        this.x = this.x + 20
          
        
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
        this.x > 0 - this.ctx.canvas.width &&
        this.y < this.ctx.canvas.height
      )
}
 

}