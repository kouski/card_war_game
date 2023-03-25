let deckId;
let computerScore = 0;
let playerScore = 0;
const newDeckBtn = document.getElementById("new-deck");
const drawCardsBtn = document.getElementById("draw-cards");
const winner = document.getElementById("winner");
const remainingText = document.getElementById("remaining");
const computerScoreEl = document.getElementById("computer-score");
const playerScoreEl = document.getElementById("player-score");

function handleClick() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      remainingText.textContent = `Remaining cards: ${data.remaining}`;
      deckId = data.deck_id;
      computerScore = 0;
      computerScoreEl.textContent = 'Computer score: 0' ;
      playerScore = 0;
      playerScoreEl.textContent = 'Player score: 0' ; 
      winner.textContent = 'Game of War';
      drawCardsBtn.disabled = false;
      document.getElementById("cards").innerHTML= '';
    });
    
}

newDeckBtn.addEventListener("click", handleClick);

drawCardsBtn.addEventListener("click", () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cards);
      remainingText.textContent = `Remaining cards: ${data.remaining}`;
      document.getElementById("cards").innerHTML = `
                <img src=${data.cards[0].image} />
                <img src=${data.cards[1].image} />
            `;
      
        const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
        winner.textContent = winnerText;
      

      if (data.remaining === 0) {
        drawCardsBtn.disabled = true;
        if(computerScore > playerScore){
          winner.innerHTML = 'Computer has win the round'
        }else if(computerScore < playerScore){
          winner.innerHTML = 'Player has win the round'
        }else{
          winner.innerHTML = 'It is a tie game'
        }
      }
    });
});

function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    computerScoreEl.textContent = `Computer score: ${computerScore}`;
    return "Computer wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    playerScore++;
    playerScoreEl.textContent = `Player score: ${playerScore}`;
    return "Player wins!";
  } else {
    return "War!!";
  }


  
}


