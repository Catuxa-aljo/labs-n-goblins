class Game {
  constructor(canvasId) {
    this.intervalId = null;
    const canvas = document.getElementById(canvasId);
    canvas.height = 600;
    canvas.width = 800;
    this.drawCount = 0
    this.ctx = canvas.getContext("2d");
    this.interface = new Interface(this.ctx);
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);
    this.score = new Score(this.ctx);
    this.scoreLife = new ScoreLife(this.ctx)
    this.graveyards = [];
    this.enemies = []
    this.extraLife = []

    this.hurtingPlayer = new Audio('./assets/sounds/hurting-player.wav');
    this.stumbling = new Audio('./assets/sounds/stumbling.wav');
    this.music = new Audio('./assets/sounds/stage.mp3');
    this.healingsound = new Audio('./assets/sounds/healing.wav');

    this.scorePointsAudio = new Audio('./assets/sounds/score-points.wav')


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
      this.checkDeaths()
    

    }, 1000 / 60)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.heigth);
    this.enemies = this.enemies.filter(enemy => enemy.isVisible()) &&
      this.enemies.filter(enemy => enemy.health > 0);
    this.player.dagues = this.player.dagues.filter(dague => dague.isVisible)
    this.graveyards = this.graveyards.filter(grave => grave.isVisible());
    this.extraLife = this.extraLife.filter(life => life.isVisible);

  }

  stop() {
    clearInterval(this.intervalId)

  }

  addEnemy() {

    if (this.drawCount % 100) {
      return
    }
    this.enemies.push(new BatHtml(this.ctx));
    this.enemies.push(new Skeleton(this.ctx));
    this.enemies.push(new Zombie(this.ctx));
    this.graveyards.push(new Gravestone(this.ctx));
    this.graveyards.push(new GravestoneAfterwork(this.ctx));
    this.graveyards.push(new GravestoneCeltic(this.ctx));
    this.extraLife.push(new ExtraLife(this.ctx));


  }

  checkCollisions() {

    this.enemies.some(enemy => {
      return this.player.dagues.some(dague => {

        if (dague.collide(enemy)) {
          dague.isVisible = false
          enemy.receiveDamage(1)


        }
      })
    });

    this.graveyards.some(grave => {
      return this.player.dagues.some(dague => {

        if (dague.collide(grave)) {
          dague.isVisible = false

        }
      })
    });

    this.enemies.some(enemy => {
      if (enemy.collide(this.player)) {
        this.hurtingPlayer.play();
        this.player.receiveDamage(1)
        this.scoreLife.img.frameIndex++
        this.checkPlayerStatus()

      }
    });

    this.graveyards.some(grave => {
      if (grave.collide(this.player)) {
        this.stumbling.play();
        this.player.receiveDamage(1)
        this.checkPlayerStatus()


      }
    });

    this.extraLife.some(life => {
      if (life.collide(this.player)) {
        life.isVisible = false
        this.healingsound.play();
        this.player.heal(1)
        this.scoreLife.img.frameIndex--
        this.checkPlayerStatus()

      }
    });

  }

  checkPlayerStatus(){
    

     

    if(this.player.health <= 0){
      this.gameOver()
    }
   

console.log(this.player.health)

  }

  checkDeaths() {
    this.enemies.forEach(enemy => {
      if (enemy.health <= 0) {
        this.scorePoints()
        this.scorePointsAudio.play()
      }
    });



  }

  scorePoints() {
    this.score.points++

  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.interface.draw();
    this.score.draw();
    this.scoreLife.draw();
    
    this.enemies.forEach(enemy => enemy.draw());
    this.graveyards.forEach(grave => grave.draw());
    this.extraLife.forEach(life => life.draw())


  }

  move() {
    this.background.move();
    this.player.move();
    this.enemies.forEach(enemy => enemy.move());
    this.graveyards.forEach(grave => grave.move());
    this.extraLife.forEach(life => life.move())

  }

  gameOver() {

    this.stop()

    this.ctx.font = "800 80px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 3
    );
    this.ctx.font = " 800 italic 80px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#870007";
    this.ctx.fillText(
      "OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );



  }


}