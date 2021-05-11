class Skeleton {
    constructor(ctx) {

        this.ctx = ctx
        this.dist = Math.random() * (8000 - 1000) + 1000;
        this.x = Math.random() > 0.5 ? 0 - this.dist : this.dist
        this.y = 360;
        this.w = 103;
        this.h = 150;

        this.health = 3;
        this.lifew = 30 * this.health;
        this.lifew2 = 30 * this.health;
        this.lifeh = 8;

        this.vx = -3;


        this.img = new Image();
        this.img.src = './assets/img/skeleton-html-2.png';
        this.img.drawCount = 0;
        this.img.frames = 9;
        this.img.frameIndex = 0;

        this.hurtingSkeleton = new Audio('./assets/sounds/hurting-skeleton.mp3')

        this.canReceiveDamage = true
    }

    draw() {

        this.img.drawCount++
        if (this.img.drawCount >= 10) {
            this.animate();
            this.img.drawCount = 0
        }

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
            this.img.width / 9,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )


    }



    move() {

        this.x += this.vx
    }

    receiveDamage(damage) {
        this.hurtingSkeleton.play()

        this.health = this.health - damage;
        this.x = this.x + 10
        this.lifew = this.lifew - this.lifew / this.health
        this.hurts = true

    }

    animate() {

        if (this.hurts) {
            this.img.frameIndex = 8
            this.hurts = false
        }

        else {
            this.img.frameIndex++
            if (this.img.frameIndex >= this.img.frames - 1) {
                this.img.frameIndex = 0
            }
        }


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