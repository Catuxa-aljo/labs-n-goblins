class Skeleton extends BatHtml{
    constructor(ctx){        
            super(ctx)
            this.dist = Math.random() * (5000 - 500) + 500;
            this.x = Math.random() > 0.5 ? 0 - this.dist : this.dist
            this.y = 360;
            this.w = 103;
            this.h = 150;
    
            this.health = 3;
    
            this.vx = -3;
            
    
            this.img = new Image();
            this.img.src = './assets/img/skeleton-html.png';
            this.img.drawCount = 0;
            this.img.frames = 4;
            this.img.frameIndex = 0;

            this.hurtingSkeleton = new Audio('./assets/sounds/hurting-skeleton.mp3')

            this.canReceiveDamage = true
    }

    

    receiveDamage(damage){
        this.hurtingSkeleton.play()
        super.receiveDamage(damage)
       
        
        
    }

    
}
