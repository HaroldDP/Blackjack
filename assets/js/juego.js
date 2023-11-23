/*
2C = Two of Clubs 
2D = Two of Diamonds 
2H = Two of Hearts  
2S = Two of Spades 
*/

// VARAIBLE INITIALIZATION
let deck = [];
const types = ['C','D','H','S'];
const specials = ['A','K','Q','J']
let playerPoints = 0,
    computerPoints = 0;

//REFERENCES HTML
const btnOrder = document.querySelector('#btnOrder');
const PointsHtml = document.querySelectorAll('small');
const btnStop = document.querySelector('#btnStop');
const btnNew = document.querySelector('#btnNew');

// create a  new letter in Html
const playerLetters = document.querySelector('#player-letters');
const Computerletters = document.querySelector('#Computer-letters');



//  DECK CREATION
const DeckCreate = () =>{
    for( let i = 2; i<= 10; i++){
        for( let type of types){
            deck.push(i+type);
        }
    }

    for( let type of types){
        for (let special of specials){
            deck.push(special+type);
   
        }
       
    }

   
    deck = _.shuffle(deck);
    console.log(deck);
    return deck
}

DeckCreate();

//  TAKING A LETTER
const pedirCarta = () =>{
     if (deck.length === 0){
        throw '  there is not letters  on the deck';
     }

     const letter = deck.pop()
      return letter

}

//  COMPUTER'S TURN
  const computerTurn = (minimunPointPlayer)=>{
    do {

        const letter = pedirCarta();
        computerPoints = computerPoints+valorCarta(letter);
        PointsHtml[1].innerText = computerPoints;

        
        const  Newletter =  document.createElement('img'); 
        Newletter.classList.add('letter');
        Newletter.src = `assets/cartas/${letter}.png`;
        Computerletters.append(Newletter);

        if(minimunPointPlayer > 21){
            break;
        }
        
    } while ((computerPoints < minimunPointPlayer) && (minimunPointPlayer<=21));
    
    //  DELAY RESULT. IT ISN'T MULTITHREAD
    setTimeout(() => {

        if (computerPoints === minimunPointPlayer){
            alert("tied");
        }else if (minimunPointPlayer > 21){
            alert("Computer was the  winner")
        } else if(computerPoints > 21){
            alert('User was the winner')
        }else{
            alert('Computer was the  winner')
        }
        
    }, 10);


  }


 // LETTER VALUE
const valorCarta = (letter) =>{
     const value = letter.substring(0, letter.length-1); // Esta separando  el numero de la letra
     return (isNaN(value))?// si 
            (value ==='A')? 11:10 //si
            : value*1; // sino

}


//EVENTOS
btnOrder.addEventListener('click', ()=>{
    
        const letter = pedirCarta();
        playerPoints = playerPoints+valorCarta(letter);
        PointsHtml[0].innerText = playerPoints;

        
        const  Newletter =  document.createElement('img'); 
        Newletter.classList.add('letter');
        Newletter.src = `assets/cartas/${letter}.png`;
        playerLetters.append(Newletter);

        if (playerPoints>21){
            console.warn(' i am sory ,  You Lose');
            btnOrder.disabled = true;
            computerTurn(playerPoints);

        }else  if(playerPoints === 21){
            console.warn(' 21  Great');
            btnStop.disabled = true;
            btnOrder.disabled = true;
        }

});



// STOP BUTTON
btnStop.addEventListener('click', () =>{
    btnStop.disabled = true;
    btnOrder.disabled = true;
    computerTurn(playerPoints);
});




// CLEAR THE  GAME
btnNew.addEventListener('click', ()=>{

    console.clear();
    deck = [];

    deck = DeckCreate();
    PointsHtml[0].innerText = 0;
    PointsHtml[1].innerText = 0;

    computerPoints = 0;    
    playerPoints = 0,
    
    // reset img
    playerLetters.innerHTML = '';
    Computerletters.innerHTML = ''; 

    btnStop.disabled = false;
    btnOrder.disabled = false;
});



 
