 import './css/styles.css';

// import { fetchCountries } from './fetchCountries'




import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';


const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const div = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 1000;


input.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

 function fetchCountries() {
  const inputValue = input.value.trim();
    console.log(inputValue);
    cleanPage()

  fetch(
    `https://restcountries.com/v3.1/name/${inputValue}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(data => {
        if (data.length > 10) {
       
        Notiflix.Notify.warning('Слишком много совпадений');
        } if (data.length === 1) {   
      
          render(data);
        
        } if (data.length > 1 && data.length < 10) {
           
        
        renderCountries(data);
        } 
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Такая страна не найдена, проверьте корректность введенных данных'
      );
      console.log(error);
    });

   
}




function render(oneCountry) {
  const markup = oneCountry
    .map(country => {
      

  

      return `<ul >
    <h1 class="county">
    <img class="image" src=${country.flags.svg} width="40" heigh="20"/>
    <p>${country.name.official}</p>
  </h1>
  <li>
    <p> Население страны: ${country.population}</p>
  </li>
  <li>
    <p> Cтолица: ${country.capital}</p>
  </li>
  <li>
    <p> Язык(и): ${Object.values(country.languages)}</p>
  </li>
</ul>`;

  

  
    })
    .join('');
    
     div.insertAdjacentHTML('beforeend', markup);
 

}






function renderCountries(countries) {
  const smallMarkup = countries
    .map(
      country =>
        `<li class="country">
          <img class="image" src="${country.flags.svg}" alt="flag" width="40px" height="20px"/>
          <p class="country-name">${country.name.official}</p>
        </li>`
    )
    .join('');

 
    ul.insertAdjacentHTML('beforeend', smallMarkup);
}


function cleanPage() {
  div.innerHTML = '';
        ul.innerHTML = '';
}