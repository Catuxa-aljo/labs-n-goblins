class Player {
    constructor(ctx) {
        this.ctx = ctx
        this.x = 97;
        this.y = 372;
        this.ground = this.y;
        this.stop = this.y;
        this.w = 97;
        this.h = 137;

        this.health = 4;

        this.vx = 0;
        this.vy = 0;
        this.g = 0.3;

        this.img = new Image();
        this.img.src = './assets/img/script-warrior-2.png';
        this.img.drawCount = 0;
        this.img.frames = 8;
        this.img.frameIndex = 0;

        this.jumpSound = new Audio('./assets/sounds/jump.wav')
      
        

        this.dagues = [];

        this.actions = {
            right: false,
            left: false,
            up: false,
           

        }

        this.setListeners()
    }

    draw() {

        this.img.drawCount++

        if (this.img.drawCount >= 10) {
            this.animate();
            this.img.drawCount = 0
        }


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

        this.dagues.forEach(b => b.draw())
    }

    move(){
        
        this.applyActions() 
        this.x += this.vx
        this.y += this.vy          
        if (this.isJumping()) {
            this.vy += this.g
          }   
               
        else if (!this.isJumping()) {
            this.vy = 0
            this.y = this.ground
          }
          

        
      
          this.dagues.forEach(dague => dague.move())

    }

    isJumping() {
        return this.y < this.ground
      }

    attack(){
        const dague = new Dague(this.ctx, this.x + this.w, this.y + this.h / 2)
        this.dagues.push(dague)
    }

    receiveDamage(damage){
        this.health = this.health - damage;
        this.x = this.x - 20
        console.log(this.health)
        
    }

    animate() {     
        this.img.frameIndex++
        
        if(this.vx === 0){    
             
            if (this.img.frameIndex >= 4) {
                this.img.frameIndex = 0}
        }

        else if (this.vx !== 0){  
              
             if (this.img.frameIndex >= this.img.frames) {
                    this.img.frameIndex = 4
                }
        }
    }

    onKeyEvent(keyCode, action){
        switch (keyCode){
            case LEFT:
                this.actions.left = action;
                break;

            case RIGHT:
                this.actions.right = action;
                break;

            case UP:
                this.actions.up = action;
                this.jumpSound.play()
                break;

            case SPACE:
                this.attack();
                break;
        }
    }

    setListeners() {
        document.onkeydown = e => this.onKeyEvent(e.keyCode,true)
        document.onkeyup = e => this.onKeyEvent(e.keyCode,false)
      }

      applyActions(){
         
        if (this.actions.left) {
            this.vx = - 2
        } else if (this.actions.right) {
            this.vx = 2

        }else if (this.actions.up){
            this.vy = -10

        } else{
            this.vx = 0
        }
      }
}