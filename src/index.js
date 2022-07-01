import './css/styles.css';
import { debounce } from 'lodash';
import {Notify}from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    inpuSearchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('ul'),
    countryInfo: document.querySelector('div'),
};

refs.inpuSearchBox.addEventListener('input', debounce(onSearchCountry,DEBOUNCE_DELAY));

function onSearchCountry(e) {

    const name = refs.inpuSearchBox.value.trim();
    refs.countryList.innerHTML  = '';
    refs.countryInfo.innerHTML = '';
  
  fetchCountries(name)
    .then(countries => {

      if (countries.length  === 1) {
        refs.countryInfo.innerHTML = cardAboutCountry(countries);
      } else if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      } else {
        refs.countryList.innerHTML = makeListCountries(countries);
      }
    }).catch(() => Notify.failure("Oops, there is no country with that name"));
};

function makeListCountries(countries) {
    return countries.map(country => `<li>
       <img src=${country.flags.svg} height="15">
        <span>${country.name.official}</span>
      </li>`).join('');
    
};

function cardAboutCountry(countries) {
  return countries.map(country => `
    <ul>
        <li>
            <img src=${country.flags.svg} height=25/>
            <span class = "name-official"><b>${country.name.official}</b></span>
        </li>
        <li> 
            <span><b>Capital:</b></span> <span>${country.capital}</span>
        </li>
        <li>
            <span><b>Population:</b></span> <span>${country.population}</span>
        </li>
        <li>       
            <span><b>Languages:</b></span> <span>${Object.values(country.languages)}</span>
        </li>
    </ul>`).join('');
};

