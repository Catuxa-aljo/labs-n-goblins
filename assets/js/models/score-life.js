class ScoreLife{
    constructor(ctx){
        this.ctx = ctx;
      
        this.w = 80;
        this.h = 27;
        this.x = 0 + this.w
        this.y = 0 + this.h;
       
        this.img = new Image();
        this.img.src = './assets/img/score-life.png';
  

        this.img.frames = 7;
        this.img.frameIndex = 0;
    }

   
    draw() {
                  
            this.ctx.drawImage(
                this.img,
                this.img.frameIndex * this.img.width / this.img.frames,
                0,
                this.img.width / 7,
                this.img.height,
                this.x,
                this.y,
                this.w,
                this.h
            )
    }

    
    
}