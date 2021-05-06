class Score{
    constructor(ctx){
        this.ctx = ctx;
        this.points = 0

        
      
    }

   
    draw() {
      
            this.ctx.font = '800 14px serif',
            this.ctx.fillStyle = 'white',
            this.ctx.textAlign = "left";
            this.ctx.fillText(
                `Learning points: ${this.points}`, this.ctx.canvas.width / 2 - 40 , 60
            )
            }

    
    
}