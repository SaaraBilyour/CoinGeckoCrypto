
// créer un objet à partir de la classe CoinGecko pour utiliser les méthodes à l'intérieur de la classe
const crypto = new CoinGecko();
let results;
const cards = document.getElementById('cards');
let choices = []; //liste des cryptos sélectionnés

//*****************************CURRENCY******************** */
//la devise par défaut est usd.
let currency = 'usd';
// Obtenez la devise en fonction du bouton cliqué
function getCurrency(value) {
  currency = value;
  if (choices.length != 0) {
    //console.log(choices)
    changeCurrencyCards(choices)
  }
  console.log(value)
}

//changer de devise
async function changeCurrencyCards(choices) {
  results = await crypto.changeCurrency(currency, choices);
   displayCards(results);
}


//**************obtenir la valeur dans la recherche *********/
//d’auto-complétions
document.getElementById('crypto').addEventListener('keyup', (e) => {
  const cryptoInput = e.target.value;
  if (cryptoInput.length > 2) {
    display(cryptoInput); 
  }
  else {
    table.innerHTML = '';
  }
});



// ********************** suggestion d'affichage **********************
const table = document.getElementById('resultsTable');
async function display(input) {
  if (input.length > 2) {
    results = await crypto.getPrice(currency, input);
    results = results.results;
    suggestionList = '';
    for (i = 0; i < results.length; i++){
        suggestionList += `
        <tr>
        <td>
        <a onClick='addCryptoCard(${i})'> ${results[i].name} 
        <img class='icon' src='${results[i].image}' /> </a>
        <td>
        </tr>`; 
    }
    table.innerHTML = suggestionList;
  }
} 

//supprimer la suggestion
function clear() {
  table.innerHTML = '';
}


// *************************** cartes  ***************
//cartes d'affichage
function displayCards(choices) {
  let displayCards = '';
  table.innerHTML = '';
  //console.log(choices)
  for (i = 0; i < choices.length; i++){
    displayCards += `
      <div class="card  mb-3" style="max-width: 18rem;">
        <div class="card-header">
            <div>${choices[i].name}</div>
            <div><span class="close" onClick='removeCard(${i})'">&times;</span></div>
        </div>
        <div class="card-body">
          <img src="${choices[i].image}" class="card-img"></img>
          <p class="card-text">price: ${choices[i].price} ${currency}</p>
        </div>
      </div>`;
  }
  cards.innerHTML = displayCards;
}

//ajouter une carte
function addCryptoCard(choice) {
  table.innerHTML = '';
  choices.push(results[choice]);
  displayCards(choices);
}

//supprimer cart
function removeCard(choice) {
  choices.splice(choice, 1); //supprimer une carte, index=choice
  displayCards(choices);
}


//*******************Date *********************** */
// choisissez la date
const date = function date() {
  return document.getElementById('date').value;
}
