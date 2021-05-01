window.addEventListener('load', () => {
    const game = new Game('game');
  
   
  
    document.getElementById('start-button').onclick = () => {
      if (!game.intervalId) {
        game.start();
      }
    }
  });