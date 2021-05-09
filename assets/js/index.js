window.addEventListener('load', () => {
    const game = new Game('game');


  
   
  
    document.getElementById('start-button').onclick = () => {
      if (!game.intervalId) {
        game.start();
        displayGame()
      }
      
    }

    document.getElementById('how-to').onclick = () => {
      document.getElementById('init-credit').style.display = 'none';
      document.getElementById('how-you-play').classList.remove('invisible')
      
    }

    document.getElementById('hall-fame').onclick = () => {
      document.getElementById('init-credit').style.display = 'none';
      document.getElementById('hall-of-fame').classList.remove('invisible')
      
    }

    document.getElementById('close-window').onclick = () => {
      document.getElementById('init-credit').style.display = 'visible';
      document.getElementById('how-you-play').classList.add('invisible')
    }


    function displayGame(){
      document.getElementById('init-credit').style.display = 'none';
      document.getElementById('game').classList.remove('invisible')}
           

  });
