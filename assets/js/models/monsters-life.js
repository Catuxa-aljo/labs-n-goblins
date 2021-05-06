class MonsterLife {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.w = 60;     
    this.h = 8;
     
    }
  
    draw() {
      this.ctx.fillStyle = '#ff3066'
      this.ctx.fillRect(
        this.x,
        this.y,
        this.w,
        this.h
      )
     
    }

    updateLifeBar(monsterhealth){
      if(monsterhealth - 1){
        this.w -20
      }

    }
  }              