class Background{
     
  constructor(ctx) {
    this.ctx = ctx

    this.x = 0
    this.y = 0
    this.h = this.ctx.canvas.height
    this.w = 1348
    this.vx = -1
    this.img = new Image()
    this.img.src = './assets/img/background.png'
  }

    draw() {
        this.ctx.drawImage(
          this.img,
          this.x,
          this.y,
          this.w,
          this.h
        )

        this.ctx.drawImage(
            this.img,
            this.x + this.w,
            this.y,
            this.w,
            this.h
        )
    }

    move(){
        this.x += this.vx
        if(this.x <= -this.w){
            this.x = 0
        }
    }
}