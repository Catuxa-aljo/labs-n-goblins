class BatHtml {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = this.ctx.canvas.width;
        this.dist = Math.random() * (400 - 20) + 20;
        this.y = Math.random() > 0.5 ? 0 - this.dist : this.dist;
        this.w = 100;
        this.h = 71;

        this.health = 2;

        this.lifew = 20 * this.health
        this.lifew2 = 20 * this.health
        this.lifeh = 8


        this.vx = -1;
        this.canReceiveDamage = true

        this.img = new Image();
        this.img.src = './assets/img/bat-html.png';
        this.img.drawCount = 0;
        this.img.frames = 8;
        this.img.frameIndex = 0;

        this.hurtingCreature = new Audio('./assets/sounds/hurting-creature.wav')


    }

    enemyLife() {
        if (this.life - 1) {
            this.life.w / 5
        }

    }

    draw() {

        this.img.drawCount++
        if (this.img.drawCount >= 10) {
            this.animate();
            this.img.drawCount = 0
        }

        //const life = new MonsterLife(this.ctx, this.x + 10 , this.y - 10, 100, 10 )
        //life.draw()

        this.ctx.fillStyle = '#5d0926'
        this.ctx.fillRect(
            this.x + 20,
            this.y,
            this.lifew2,
            this.lifeh
        )

        this.ctx.fillStyle = '#ff3066'
        this.ctx.fillRect(
            this.x + 20,
            this.y,
            this.lifew,
            this.lifeh
        )


        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / 8,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )


    }

    animate() {
        if (this.hurts) {
            this.img.frameIndex = 7
            this.hurts = false
        }

        else {
        this.img.frameIndex++

        if (this.img.frameIndex >= this.img.frames - 1) {
            this.img.frameIndex = 0
        }
    }
    }

    move() {

        this.x += this.vx
    }

    receiveDamage(damage) {
        this.hurtingCreature.play()
        this.health = this.health - damage;
        this.x = this.x + 20
        this.lifew = this.lifew - this.lifew / this.health
        this.hurts = true

    }

    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w;
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y;

        if (collideX && collideY && this.canReceiveDamage) {


            this.canReceiveDamage = false

            setTimeout(() => {
                this.canReceiveDamage = true
            }, 5000)

            return collideX && collideY;
        }

        return false

    }


    isVisible() {
        return (
            this.x < this.ctx.canvas.width * 2 &&
            this.x > 0 - this.ctx.canvas.width
        )
    }
}