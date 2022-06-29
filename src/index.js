import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    inpuSearchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('ul'),
    countryInfo: document.querySelector('div'),
};

refs.inpuSearchBox.addEventListener('input', debounce(onSearchCountry,DEBOUNCE_DELAY));

function onSearchCountry() {
    const name = refs.inpuSearchBox.value.trim();
    inpuSearchBox.reset();

    fetchCountries(name)
        .then(countries => {
            if (countries.lenght === 1) {
                countryInfo.innerHTML = cardAboutCountry(countries);
            } else if {

            }
            
        } )

};

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText);
        };
        return response.json();
    })
};

function makeListCountries(countries) {
    return countries.map(country => `<li class="country-list__item">
       <img src=${country.flags.svg} decoding="async" height="15">
        <span>${country.name.official}</span>
      </li>`).join('');
    
};

function cardAboutCountry(countries) {
    return countries.map(country => `<ul>
  <li>
    <img src=${country.flags.svg} height="25">
    <span><b>${country.name.official}</b></span>
  </li>
  <li>
    <span><b>Capital:</b><span>${country.capital}</span></span>
  </li>
  <li>
    <span><b>Population:</b><span>${country.population}</span></span>
  </li><li>
    <span><b>Languages:</b><span>${country.languages}</span></span>
  </li>
</ul>`).join('')
};

