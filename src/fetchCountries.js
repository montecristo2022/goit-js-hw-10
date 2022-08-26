import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';

const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const div = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 1000;
const arr = [];
const countriesArr = [];

input.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

export function fetchCountries() {
  const inputValue = input.value.trim();
    console.log(inputValue);
    
    

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
        Notiflix.Notify.failure('Слишком много совпадений');
      } else if (data.length === 1) {
        console.log(data);
        for (const el of data) {
          arr.push(el);
          render();
        }
      } else if (data.length > 1 && data.length < 10) {
        for (const element of data) {
          countriesArr.push(element);
        }
        renderCountries();
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Такая страна не найдена, проверьте корректность введенных данных'
      );
      console.log(error);
    });

    if (inputValue === '') {
        div.innerHTML = '';
        ul.innerHTML = '';
    }
}

function render() {
  for (const element of arr) {
      const markup = `<ul >
    <h1 class="county">
    <img class="image" src=${element.flags.svg} width="40" heigh="20"/>
    <p>${element.name.common}</p>
  </h1>
  <li>
    <p> Население страны: ${element.population}</p>
  </li>
  <li>
    <p> Cтолица: ${element.capital}</p>
  </li>
  <li>
    <p> Язык(и): ${Object.values(element.languages)}</p>
  </li>
</ul>`;

  

      ul.innerHTML = '';
     div.insertAdjacentHTML('beforeend', markup);
    //   div.innerHTML = markup;
  }
}

function renderCountries() {
  for (const element of countriesArr) {
    const markupCountries = `<ul >
  <li class="county">
    <img class="image" src=${element.flags.svg} width="40" heigh="20"/>
    <p>${element.name.common}</p>
  </li>`;
      
      div.innerHTML = '';
      ul.insertAdjacentHTML('beforeend', markupCountries);
    //   ul.innerHTML = markupCountries;
  }
}
