window.addEventListener('load', () => {
  let game = new Game('game');


  document.getElementById('start-button').onclick = () => {
    if (!game.intervalId) {
      game.start();
      displayGame()

    }

  }

  document.getElementById('play-again').onclick = () => {
    game = new Game('game');
    game.start();
    displayGame()

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
    document.getElementById('init-credit').style.display = 'block';
    document.getElementById('how-you-play').classList.add('invisible')
  }


  function displayGame() {
    document.getElementById('init-credit').style.display = 'none';
    document.getElementById('game-over').classList.add('invisible')
    document.getElementById('game').classList.remove('invisible')
  }

  

  document.getElementById('add-name').onclick = () => {
    document.getElementById('hall-of-fame').classList.remove('invisible')
    document.getElementById('win').classList.add('invisible')
    addWinner()

  }


});

function addWinner() {
  let winner = document.getElementById('winners');
  let hallOfFame = document.createElement('li')
  hallOfFame.innerText = document.getElementById('name').value
  winner.appendChild(hallOfFame)
}
