class EvilDome{
    constructor(ctx){
        this.ctx = ctx;

        this.isVisible = true

        this.x = this.ctx.canvas.width
        this.y = 260;
        this.w = 281
        this.h = 240

        this.health = 12;
        this.lifew = 8 * this.health;
        this.lifew2 = 96;
        this.lifeh = 8;
        
        this.vx = -3;
        this.vy = 0;
  
        this.canReceiveDamage = true
        this.canShoot = true

        this.img = new Image();
        this.img.src = './assets/img/evil-dom.png';
        this.img.drawCount = 0;
        this.img.frames = 13;
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

        this.ctx.fillStyle = '#5d0926'
        this.ctx.fillRect(
            this.x + 70,
            this.y,
            this.lifew2,
            this.lifeh
        )

        this.ctx.fillStyle = '#ff3066'
        this.ctx.fillRect(
            this.x + 70,
            this.y,
            this.lifew,
            this.lifeh
        )


        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / 13,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )

        this.deathFires.forEach(fire => fire.draw())
    }

    attack(){
        
        const fire = new DeathFire(this.ctx, this.x , Math.random() * (this.ctx.canvas.height - this.h))
       if(this.canShoot){ this.shootSound.play()
        this.deathFires.push(fire)
        this.canShoot = false
        setTimeout(() => {
           this.canShoot = true
       },1000) }
              
    }

    receiveDamage(damage){
        this.hurtingDom.play()       
        this.health = this.health - damage;   
        this.x = this.x + 20
        this.lifew = this.lifew - 8
        this.hurts = true
          
        
    }

    animate() {  
           
        if (this.hurts) {
            this.img.frameIndex = 12
            this.hurts = false
        }

        else {
        this.img.frameIndex++       
                    
             if (this.img.frameIndex >= this.img.frames - 1) {
                    this.img.frameIndex = 0
             }
            }
    
    }

    move(){
       
       this.x += this.vx
     
     
        if(this.x <= 0){
            this.vx = 3
        }

        if(this.x >= this.ctx.canvas.width - this.w){
            this.vx = -3
        }
        setInterval(() => {
           this.vx*2
        },1000)

        this.deathFires.forEach(fire => fire.move()) 

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