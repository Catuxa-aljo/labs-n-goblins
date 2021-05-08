window.addEventListener('load', () => {
    const game = new Game('game');


  
   
  
    document.getElementById('start-button').onclick = () => {
      if (!game.intervalId) {
        game.start();
        displayGame()
      }
      
    }

    function displayGame(){
      document.getElementById('start-button').style.display = "none";
      document.getElementById('game').style.display = "visible";}
      
     

  });
