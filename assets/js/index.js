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
    getValues();

  }

  document.getElementById('close-how').onclick = () => {
    document.getElementById('init-credit').style.display = 'block';
    document.getElementById('how-you-play').classList.add('invisible')
  }

  document.getElementById('close-hall').onclick = () => {
    document.getElementById('init-credit').style.display = 'block';
    document.getElementById('hall-of-fame').classList.add('invisible')
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
    getValues();

  }



});


const list = document.getElementById('winners'),
form = document.querySelector('form'),
item = document.getElementById('name');

function addWinner() { 
  form.addEventListener('submit',function(e){
    e.preventDefault();
    list.innerHTML += '<li>' + item.value + '</li>';
    store();
    item.value = "";
  },false)  
  
  function store() {
    window.localStorage.myitems = list.innerHTML;
  }
  
}
function getValues() {
  const storedValues = window.localStorage.myitems;    
   
      list.innerHTML = storedValues;
      }
