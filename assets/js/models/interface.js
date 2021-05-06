class Interface{
    constructor(ctx){
        this.ctx = ctx;
      
        this.w = this.ctx.canvas.width;
        this.h = 134;
        this.x = 0 
        this.y = 0 ;
       
        this.img = new Image();
        this.img.src = './assets/img/interface.png';
  

    
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
