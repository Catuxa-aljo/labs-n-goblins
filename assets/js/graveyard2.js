class Gravestone2 extends Gravestone{
    constructor(ctx, y, w, h) {
        this.ctx = ctx;        
        this.dist = Math.random() * (5000 - 500) + 500;
        this.x = Math.random() > 0.5 ? 0 - this.dist : this.dist
        this.y = y;
        this.w = w;
        this.h =h;

        this.vx = -1

        this.img = this.img = new Image();
        this.img.src = './assets/img/graveyard2.png';
    }

       
        
    }