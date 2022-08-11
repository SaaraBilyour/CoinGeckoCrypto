
class CoinGecko {
  constructor() {}

  // pour obtenir la 500 monnaie crypto populaire
  async list(currency) {
    const list1 = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false`);
    
    const list2 = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=2&sparkline=false`);
    
    const list1Json = await list1.json(); // 250per page
    const list2Json = await list2.json(); // 250per page
    const list = list1Json.concat(list2Json); // 500 tout crypto
    return list;
  }
  

  //pour obtenir la liste des suggestions lorsque le client tape 3 lettres ou plus
  async getPrice(currency = 'usd', crypto) {
    let results=[];
     const toutCrypto = await this.list(this.currency=currency).then(res => {
      Object.keys(res).forEach(function (element){
      
        //vérifiez le nom, l'identifiant et le symbole pour obtenir des résultats correspondants au texte saisi dans le champ de recherche
        if (res[element].id.startsWith(crypto) ||
          res[element].name.startsWith(crypto) ||
          res[element].symbol.startsWith(crypto))
        { 
          //créer un tableau personnalisé d'objets pour stocker uniquement les données dont nous avons besoin (id, name, image , .. etc)
          results.push({
            id: res[element].id,
            name: res[element].name,
            image: res[element].image,
            symbol: res[element].symbol,
            price: res[element].current_price,
            date: res[element].last_updated,
          })
          
        } 
      });  
     });
    return {
       results
        }
  }


  //pour changer la devise du prix lorsque le client choisit USD ou CAD
  async changeCurrency(currency, choices) {
    let results=[];
    //console.log(choices) //choices: sont les choix sélectionnés par le client et maintenant nous les récupérons pour obtenir le prix avec une devise différente
    for (i = 0; i < choices.length; i++)
    {
      console.log(choices[i].id)
      const updateCurrency = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${choices[i].id}`)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);

          //créer un tableau personnalisé d'objets pour stocker uniquement les données dont nous avons besoin (id, name, image , .. etc)
          results.push({
            id: data[0].id,
            name: data[0].name,
            image: data[0].image,
            symbol: data[0].symbol,
            price: data[0].current_price,
            date: data[0].last_updated,
          })})
    }
    console.log(results)
    return results;
    
  }
}
