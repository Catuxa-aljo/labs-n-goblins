class MonsterLife {
    constructor(ctx, x, y, w, h) {
      
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h
      // TODO
    }
  
    draw() {
      this.ctx.fillStyle = 'red',  
      this.ctx.fillRect(this.x, this.y, this.w, this.h)
      // TODO
      // echa un ojo a.. fillRect
    }
  }              