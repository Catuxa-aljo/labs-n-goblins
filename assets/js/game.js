class Game {
  constructor(canvasId) {
    this.intervalId = null;
    const canvas = document.getElementById(canvasId);
    canvas.height = 600;
    canvas.width = 800;
    this.drawCount = 0
    this.setTimeBoss = 0
    this.ctx = canvas.getContext("2d");
    this.interface = new Interface(this.ctx);
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);
    this.domeEvil = new EvilDome(this.ctx)
    this.score = new Score(this.ctx);
    this.scoreLife = new ScoreLife(this.ctx)

    this.gameOverImg = new GameOver(this.ctx);
    this.winImg = new Win(this.ctx);

    this.graveyards = [];
    this.enemies = []
    this.extraLife = []

    this.hurtingPlayer = new Audio('./assets/sounds/hurting-player.wav');
    this.stumbling = new Audio('./assets/sounds/stumbling.wav');
    this.music = new Audio('./assets/sounds/stage.mp3');
    this.healingsound = new Audio('./assets/sounds/healing.wav');

    this.scorePointsAudio = new Audio('./assets/sounds/score-points.wav')
    this.finalBattle = new Audio('./assets/sounds/bossbattle.mp3')
    this.gameoverSound = new Audio('./assets/sounds/game-over.mp3');
    this.victoriusAudio = new Audio('./assets/sounds/victorius.mp3');


  }
  start() {
    this.intervalId = setInterval(() => {
      this.music.play()
      this.clear();
      this.move();
      this.draw()
      this.addEnemy()
      this.checkCollisions()
      this.checkDeaths()
      this.checkPlayerStatus()


      if (this.drawCount++ > 100000) {
        this.drawCount = 0;

      }

    }, 1000 / 60)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.heigth);
    this.enemies = this.enemies.filter(enemy => enemy.isVisible()) &&
      this.enemies.filter(enemy => enemy.health > 0);
    this.player.dagues = this.player.dagues.filter(dague => dague.isVisible);
    this.domeEvil.deathFires = this.domeEvil.deathFires.filter(fire => fire.isVisible)
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
    //this.graveyards.push(new Gravestone(this.ctx));
    //this.graveyards.push(new GravestoneAfterwork(this.ctx));
    //this.graveyards.push(new GravestoneCeltic(this.ctx));
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

    if (this.domeEvil.isVisible) {
      this.player.dagues.some(dague => {
        if (dague.collide(this.domeEvil)) {
          dague.isVisible = false
          this.domeEvil.receiveDamage(1)
          console.log(this.domeEvil.health)
        }
      })
    }

    this.domeEvil.deathFires.some(fire => {
      if (fire.collide(this.player)) {

        fire.isVisible = false
        this.player.receiveDamage(2)
        this.scoreLife.img.frameIndex++
        this.scoreLife.img.frameIndex++
        console.log(this.player.health)

      }
    })

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

      }
    });



    this.graveyards.some(grave => {
      if (grave.collide(this.player)) {
        this.stumbling.play();
        this.player.receiveDamage(1)
        this.scoreLife.img.frameIndex++

      }
    });

    if (this.domeEvil.isVisible && this.domeEvil.collide(this.player)) {
      this.player.receiveDamage(2)
      this.scoreLife.img.frameIndex++
      this.scoreLife.img.frameIndex++

    }

    this.extraLife.some(life => {
      if (life.collide(this.player) && this.player.health < 6) {
        life.isVisible = false
        this.healingsound.play();
        this.player.heal(1)
        if (this.scoreLife.img.frameIndex >= 0 && this.scoreLife.img.frameIndex < 5) {
          this.scoreLife.img.frameIndex--
        }
        console.log(this.player.health)
      }
    });

  }

  checkPlayerStatus() {

    if (this.player.health <= 0) {
      this.gameOver()
    }


  }

  checkDeaths() {
    this.enemies.forEach(enemy => {
      if (enemy.health <= 0) {
        this.scorePoints()
        this.scorePointsAudio.play()
      }
    });

    this.domeEvil.isVisible = false
    if (this.score.points === 5) {

      this.domeEvil.isVisible = true
      this.domeEvil.draw();
      this.domeEvil.move();
      this.addFinalBoss();
    }

    if (this.domeEvil.health <= 0) {
      this.victorius()
    }

  }

  scorePoints() {
    this.score.points++


  }

  addFinalBoss() {
    this.music.pause()
    this.finalBattle.play()
    setTimeout(() => {
      this.domeEvil.attack()
    }, 1000)
    this.graveyards = [];
    this.enemies = []
    this.extraLife = []


  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.enemies.forEach(enemy => enemy.draw());
    this.graveyards.forEach(grave => grave.draw());
    this.extraLife.forEach(life => life.draw())
    this.interface.draw();
    this.score.draw();
    this.scoreLife.draw();

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
    this.music.pause()
    this.finalBattle.pause()
    this.gameoverSound.play()
    document.getElementById('game-over').classList.remove('invisible')
    document.getElementById('game').classList.add('invisible')
    



  }

  victorius() {

    this.stop()
    this.music.pause()
    this.finalBattle.pause()
    this.victoriusAudio.play()
    document.getElementById('win').classList.remove('invisible')
    document.getElementById('game').classList.add('invisible')



  }


}