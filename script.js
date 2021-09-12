// Part 2: Deck of Cards
// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
BASE_API_URL = "http://deckofcardsapi.com/api/deck/";
newDeck = axios
  .get(BASE_API_URL + "new/draw/?count=1")
  .then((response) =>
    console.log(
      `${response.data.cards[0].value} of ${response.data.cards[0].suit}`
    )
  );

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
let deckID, cardOne, cardTwo;

newDeckTwo = axios
  .get(BASE_API_URL + "new/draw/?count=1")
  .then((response) => {
    cardOne = `${response.data.cards[0].value} of ${response.data.cards[0].suit}`;
    console.log(
      `${response.data.cards[0].value} of ${response.data.cards[0].suit}`
    );
    deckID = response.data.deck_id;
    return axios.get(BASE_API_URL + `${deckID}/draw/?count=1`);
  })
  .then((response) => {
    cardTwo = `${response.data.cards[0].value} of ${response.data.cards[0].suit}`;
    console.log(cardOne, cardTwo);
  });

// Once you have both cards, console.log the values and suits of both cards.

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

let deckIDTwo = null;
let $button = $("button");
let $cardArea = $("#card-area");

axios.get(`${BASE_API_URL}/new/shuffle/`).then((response) => {
  deckIDTwo = response.data.deck_id;
});

$button.on("click", function () {
  axios.get(`${BASE_API_URL}${deckIDTwo}/draw/`).then((response) => {
    let cardSrc = response.data.cards[0].image;
    console.log(cardSrc, deckIDTwo);
    $cardArea.append($(`<img src= '${cardSrc}'>`));
  });
});
