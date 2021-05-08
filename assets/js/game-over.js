class GameOver{
    constructor(ctx){
        this.ctx = ctx
        this.x = 0
        this.y = 0
        this.h = this.ctx.canvas.height
        this.w = this.ctx.canvas.width
    
        this.img = new Image()
        this.img.src = './assets/img/game-over.png'
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


}