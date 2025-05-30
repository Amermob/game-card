let deckId = "";
let isDraw = false;
let computer = 0;
let user = 0;
const getNewCard = document.querySelector("#get-card");
const startOver = document.querySelector("#start-over");

getNewCard.addEventListener("click", async () => {
  const res = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await res.json();
  deckId = data.deck_id;
  isDraw = true;
});

document.querySelector("#draw").addEventListener("click", () => {
  if (isDraw) {
    fetch(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    )
      .then((res) => res.json())
      .then((data) => {
        document.querySelector(
          ".remaining"
        ).textContent = `Remaining Card: ${data.remaining}`;
        document.querySelector(
          ".card-box"
        ).children[0].innerHTML = `<img src=${data.cards[0].image} alt=card-1>`;

        document.querySelector(
          ".card-box"
        ).children[1].innerHTML = `<img src=${data.cards[1].image} alt=card-2>`;

        if (data.remaining == 0) {
          startOver.style.display = "block";
          if (computer > user) {
            document.querySelector(".game-name").textContent =
              "Computer Is the Winner";
          } else if (computer < user) {
            document.querySelector(".game-name").textContent =
              "You are the Winner";
          } else if (computer === user) {
            document.querySelector(".game-name").textContent = "A Draw 😲!";
          }
        }
        results(data.cards[0].value, data.cards[1].value);
      });
  } else {
    alert("Please Craw a Card First");
  }
});

function results(card1, card2) {
  const index = [
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
  const indexCard1 = index.indexOf(card1);
  const indexCard2 = index.indexOf(card2);

  if (indexCard1 > indexCard2) {
    computer++;
    document.querySelector(
      ".computer"
    ).textContent = `Computer Points: ${computer}`;
  } else if (indexCard2 > indexCard1) {
    user++;
    return (document.querySelector(
      ".user"
    ).textContent = `User's Point: ${user}`);
  } else if (indexCard1 === indexCard2) {
    return console.log("its a draw");
  }
}

startOver.addEventListener("click", () => {
  window.location.reload();
});
