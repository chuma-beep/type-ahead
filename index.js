//this link is where we get our data from
const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

//put cities into array
const cities = [];

//fecth data
fetch(endpoint)
//didn't know about blob before till now. stands for binary large object, it's a data type iuse to represent large object.
.then(blob => blob.json())
.then(data => cities.push(...data));

// check if elements properly match
function findMatches(wordToMatch, cities) {
return cities.filter(place => {
// here we need to figure out if the city or state matches what was searched.
const regex = new RegExp(wordToMatch, 'gi');
return place.city.match(regex) || place.state.match(regex)
});
}
//add commas
function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
//display matches
function displayMatches(){
    const matchArray  = findMatches(this.value, cities);
    const html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName  = place.city.replace(regex, `<span class="h1">${this.value}<span>`);
      const stateName  = place.state.replace(regex, `<span class="h1">${this.value}<span>`); 
      return `
        <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join("");
    suggestions.innerHTML = html;
}

//add  eventListeners
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);



