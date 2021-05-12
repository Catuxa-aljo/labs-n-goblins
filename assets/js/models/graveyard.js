class Gravestone {
    constructor(ctx) {
        this.ctx = ctx;        
        this.dist = Math.random() * (8000 - 1000) + 1000;
        this.x = Math.random() > 0.5 ? 0 - this.dist : this.dist
        this.y = 420;
        this.w = 83;
        this.h = 100;

        this.canHurt = false;

        this.vx = -1

        this.img = this.img = new Image();
        this.img.src = './assets/img/graveyard.png';

       
        
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        ) 
    }

    move() {

        this.x += this.vx
        
    }

    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w;
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y;
    
        if (collideX && collideY && this.canHurt) {

            this.canHurt = false

            setTimeout(() => {
                this.canHurt = true
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