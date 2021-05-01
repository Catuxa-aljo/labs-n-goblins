class Game {
  constructor(canvasId) {
    this.intervalId = null;
    const canvas = document.getElementById(canvasId);
    canvas.height = 600;
    canvas.width = 800;
    this.drawCount = 0
    this.ctx = canvas.getContext("2d");
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);
    this.score = new Score(this.ctx);
    this.graveyard = [];
    //this.graveyard2 = [];
    this.bats = [];
    this.skeletons = [];
    this.zombieHorde = [];
  


    this.hurtingPlayer = new Audio('./assets/sounds/hurting-player.wav');
    this.stumbling = new Audio('./assets/sounds/stumbling.wav');
    this.music = new Audio('./assets/sounds/stage.mp3');
    this.hurtingCreature = new Audio('./assets/sounds/hurting-creature.wav')


  }
  start() {
    this.intervalID = setInterval(() => {
      this.music.play()
      this.clear();
      this.move();
      this.draw()
      this.addEnemy()
      
      if (this.drawCount++ > 100000) {
        this.drawCount = 0;
      }
      this.checkCollisions()
     
    }, 1000 / 60)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.heigth);
    this.bats = this.bats.filter(bat => bat.isVisible());
    this.skeletons = this.skeletons.filter(skeleton=> skeleton.isVisible());
    this.graveyard = this.graveyard.filter(grave => grave.isVisible());
    this.zombieHorde = this.zombieHorde.filter(zombie => zombie.isVisible());
    this.player.dagues = this.player.dagues.filter(dague => dague.isVisible)
   
    //this.graveyard2 = this.graveyard.filter(ob => ob.isVisible());


  }

  addEnemy() {

    if (this.drawCount % 100) {
      return
    }
    this.bats.push(new BatHtml(this.ctx));
    this.graveyard.push(new Gravestone(this.ctx));
    this.skeletons.push(new Skeleton(this.ctx));
    this.zombieHorde.push(new Zombie(this.ctx));
   

    
    //this.graveyard2.push(new Gravestone2(this.ctx));
    
  }

  checkCollisions() {
    const batCollision = this.bats.some(ob => ob.collide(this.player));
    const graveStoneCollision = this.graveyard.some(ob => ob.collide(this.player));
    //const graveStoneCollision2 = this.graveyard2.some( ob => ob.collide(this.player));
    const dagueCollisionBat = this.bats.some(bat =>{
      return this.player.dagues.some(dague =>{
        
        if (dague.collide(bat)) {
          dague.isVisible = false
          bat.receiveDamage(1)
          this.hurtingCreature.play()
          this.checkDeaths()
        }
      })
    });

    if (batCollision) {
      this.hurtingPlayer.play();
     // this.player.receiveDamage(1);

    }

    else if (graveStoneCollision) {
      this.stumbling.play();
     // this.player.receiveDamage(1);

    }
  }

  checkDeaths(){
    this.bats.filter(bat => bat.health > 0);
    this.scorePoints()
  }

  scorePoints() {
    this.score.points++

  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.score.draw();

    //this.graveyard2.forEach( ob => ob.draw());
    this.graveyard.forEach(grave => grave.draw());
    this.bats.forEach(bat => bat.draw());
    this.skeletons.forEach(skeleton => skeleton.draw());
    this.zombieHorde.forEach(zombie => zombie.draw())
  

  }

  move() {
    this.background.move();
    this.player.move();
    this.graveyard.forEach(ob => ob.move());
    //this.graveyard2.forEach( ob => ob.move());
    this.bats.forEach(ob => ob.move());
    this.skeletons.forEach(skeleton => skeleton.move())
    this.zombieHorde.forEach(zombie => zombie.move())
    
  }



}