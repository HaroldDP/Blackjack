const myModule = (() =>{
    'use strict'

    // VARAIBLE INITIALIZATION
    let deck = [];

    const types = ['C','D','H','S'],
          specials = ['A','K','Q','J'];

  
    let playersdots = [];


    //REFERENCES HTML
    const btnOrder = document.querySelector('#btnOrder'),
          btnStop = document.querySelector('#btnStop'),
          btnNew = document.querySelector('#btnNew');

    // create a  new letter in Html
    const divLettersPlayers = document.querySelectorAll('.divletters'),
    PointsHtml = document.querySelectorAll('small');
    

     // initializeGame  
     const initializeGame = (numPlyers = 2)=>{
        deck = DeckCreate();
        playersdots = [];
        for (let i = 0; i < numPlyers; i++) {
            playersdots.push(0);
        }
        PointsHtml.forEach(elem => elem.innerText = 0);
        divLettersPlayers.forEach(elem => elem.innerHTML = '');
    

        btnStop.disabled = false;
        btnOrder.disabled = false;
    }

                                                                
    //  DECK CREATION
    const DeckCreate = () =>{
        deck = [];
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
        
        return _.shuffle(deck);
    }
    
    
    //  TAKING A LETTER
    const pedirCarta = () =>{
         if (deck.length === 0){
            throw '  there is not letters  on the deck';
         }
    
         return  deck.pop();

    }
    
    
    // LETTER VALUE
   const valorCarta = (letter) =>{
        const value = letter.substring(0, letter.length-1); // Esta separando  el numero de la letra
        return (isNaN(value))?// si 
               (value ==='A')? 11:10 //si
               : value*1; // sino
   
   }

// Turn or shift = First player and  the las one  would be the computer
    // ARRAY PLAYERS
    const collectPoint = (letter,turn) =>{
    playersdots[turn] = playersdots[turn]+valorCarta(letter);
    PointsHtml[turn].innerText = playersdots[turn];
    return playersdots[turn];

   }

   //CREATELETTER
   const letterCreate = (letter, turn)=>{

    const  Newletter =  document.createElement('img'); 
    Newletter.classList.add('letter');
    Newletter.src = `assets/cartas/${letter}.png`;
    divLettersPlayers[turn].append(Newletter);

   }
   
   const determineWinner = ()=>  {
    //Destruction
    const [minimunPointPlayer, computerPoints] = playersdots;

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
           
       }, 100);
       
   }


   //  COMPUTER'S TURN
      const computerTurn = (minimunPointPlayer)=>{
        let computerPoints = 0;

        do {
    
            const letter = pedirCarta();
            computerPoints = collectPoint(letter , playersdots.length-1);
            letterCreate(letter,playersdots.length-1);
            
        } while ((computerPoints < minimunPointPlayer) && (minimunPointPlayer<=21));
        
        //  DELAY RESULT. IT ISN'T MULTITHREAD
        determineWinner();
    
      }
    
    
    
    
    //EVENTOS
    btnOrder.addEventListener('click', ()=>{
        
            const letter = pedirCarta();
            const playersdots = collectPoint(letter,0);
            letterCreate(letter,0);

            
            if (playersdots>21){
                console.warn(' i am sorry ,  You Lose');
                btnOrder.disabled = true;
                btnStop.disabled = true;
                computerTurn(playersdots);
    
            }else  if(playersdots === 21){
                console.warn(' 21  Great');
                btnOrder.disabled = true;
                btnStop.disabled = true;
                computerTurn(playersdots);
                
            }
    
    });
    
    
    
    // STOP BUTTON
    btnStop.addEventListener('click', () =>{
        btnOrder.disabled = true;
        btnStop.disabled = true;
        
        computerTurn(playersdots[0]);
        
    });
    
    
    
    
    // CLEAR THE  GAME
    // btnNew.addEventListener('click', ()=>{
    //     initializeGame();
        
 
    // });
    
    
    return {
       NewGame:  initializeGame
    };

})();

