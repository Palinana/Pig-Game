/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//initializing variables
var scores, roundScores, activePlayer;

init();

//selecting the button and creating annanomous btn
document.querySelector('.btn-roll').addEventListener('click',function(){
    //1.random number
    var dice = Math.floor(Math.random() * 6) + 1;
    //2.display the result, make it visible and set the image
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    //3.update the round score if the rolled number was not a one
    if(dice !== 1){
        //add score
        roundScore += dice;
        //display the round score
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

    }
    else{
        //next player
        nextPlayer();
    }
}); 


document.querySelector('.btn-hold').addEventListener('click', function(){
    //add current score to global score
    scores[activePlayer] += roundScore;
    //update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //check if player won the game
    if(scores[activePlayer] >= 100){
        document.querySelector('#name-' +activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.dice').style.display = 'none';
    }
    else{
        nextPlayer(); 
    }
});





//to not repeat yourself
function nextPlayer(){
    if(activePlayer === 0){
            activePlayer = 1; 
        } 
        else{
            activePlayer = 0;
           
        }
        roundScore = 0;
        //show score to the user
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        //manipulate active 
        
//        document.querySelector('.player-0-panel').classList.remove('active');
//        document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        //hide the dice
        document.querySelector('.dice').style.display = 'none';
}

//setting start values
function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0; 
    
    //hide the dice at the beginning
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    //as we don't know who is the winner, ermoving from both
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}



//new game, call not an annon. then innit instead
document.querySelector('.btn-new').addEventListener('click', init);