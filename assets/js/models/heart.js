class ExtraLife {
    constructor(ctx) {
        this.ctx = ctx
        this.dist = Math.random() * (5000 - 1000) + 1000;
        this.x = Math.random() > 0.5 ? 0 - this.dist : this.dist  
        this.y = 450;
        this.w = 40;
        this.h = 40;

        this.vx = -1



        this.img = new Image();
        this.img.src = './assets/img/extra-life.png';
        this.img.drawCount = 0;
        this.img.frames = 6;
        this.img.frameIndex = 0;

        this.canHeal = true

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
                this.img.width / 6,
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

            move() {

                this.x += this.vx
                
            }

            collide(el) {
                const collideX = el.x + el.w > this.x && el.x < this.x + this.w;
                const collideY = el.y < this.y + this.h && el.y + el.h > this.y;
    
                if (collideX && collideY && this.canHeal){
    
                
                 this.canHeal = false
                
                setTimeout(() => {
                    this.canHeal = true
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