/* eslint-disable no-restricted-syntax */
import './style.css'
import { getWeather } from "./modules/api";

// Initialize default cities for left side
const cities = ['Los Angeles', 'Chicago', 'New York', 'London', 'Berlin'];

// Create static DOM
const main = document.createElement('main');
main.setAttribute('id', 'main');
document.body.appendChild(main);

// Left side
const citySide = document.createElement('div');
citySide.setAttribute('id', 'city-side');
citySide.classList.add('city-side');
main.appendChild(citySide);

// Right side
const searchSide = document.createElement('div');
searchSide.setAttribute('id', 'search-side');
searchSide.classList.add('search-side');
main.appendChild(searchSide);

// Search form
const formDiv = document.createElement('div');
const searchForm = document.createElement('form');
searchForm.setAttribute('id', 'search');

const searchBarDiv = document.createElement('div');
searchBarDiv.setAttribute('id', 'search-bar-div');
searchForm.appendChild(searchBarDiv);
const searchBar = document.createElement('input');
searchBar.setAttribute('id', 'search-bar');
searchBar.setAttribute('type', 'text');
searchBar.setAttribute('name', 'search-bar');
searchBar.classList.add('card');
searchBar.setAttribute('placeholder', 'Search for a city...');
searchBarDiv.appendChild(searchBar);

const searchButtonDiv = document.createElement('div');
searchButtonDiv.setAttribute('id', 'search-button-div');
searchForm.appendChild(searchButtonDiv);
const searchButton = document.createElement('button');
searchButton.setAttribute('type', 'submit');
searchButton.innerText = 'Search';
searchButtonDiv.appendChild(searchButton);

formDiv.appendChild(searchForm);
searchSide.appendChild(formDiv);

// Hidden error div
const errorDiv = document.createElement('div');
errorDiv.setAttribute('id', 'error');
errorDiv.classList.add('error', 'hide', 'card');
errorDiv.innerText = 'City not in database.';
searchSide.appendChild(errorDiv);

// Search results div
const resultsDiv = document.createElement('div');
resultsDiv.setAttribute('id', 'results-div');
resultsDiv.classList.add('results-div', 'card');
searchSide.appendChild(resultsDiv);

// Results top row
const resultsTop = document.createElement('div');
resultsTop.setAttribute('id', 'results-top');
resultsTop.classList.add('vertical');
resultsDiv.appendChild(resultsTop);

const resultsName = document.createElement('div');
resultsName.setAttribute('id', 'results-name');
resultsTop.appendChild(resultsName);

const resultsTime = document.createElement('div');
resultsTime.setAttribute('id', 'results-time');
resultsTop.appendChild(resultsTime);

// Results mid row
const resultsMid = document.createElement('div');
resultsMid.setAttribute('id', 'results-mid');
resultsMid.classList.add('horizontal');
resultsDiv.appendChild(resultsMid);

const reTemp = document.createElement('div');
reTemp.setAttribute('id', 'results-temp');
resultsMid.appendChild(reTemp);

const resultsIconDiv = document.createElement('div');
resultsIconDiv.setAttribute('id', 'results-icon-div');
resultsIconDiv.classList.add('vertical');
resultsMid.appendChild(resultsIconDiv);

const resultsIconImg = document.createElement('div');
resultsIconImg.setAttribute('id', 'results-icon-img');
resultsIconDiv.appendChild(resultsIconImg);

const resultsIconText = document.createElement('div');
resultsIconText.setAttribute('id', 'results-icon-text');
resultsIconDiv.appendChild(resultsIconText);

// Results bottom row
const resultsBot = document.createElement('div');
resultsBot.setAttribute('id', 'results-bot');
resultsBot.classList.add('horizontal');
resultsDiv.appendChild(resultsBot);

const reHi = document.createElement('div');
reHi.setAttribute('id', 'hi-div');
reHi.classList.add('vertical');
resultsBot.appendChild(reHi);

const hiText = document.createElement('div');
hiText.setAttribute('id', 'hi-text');
hiText.innerText = 'High';
reHi.appendChild(hiText);

const hiTemp = document.createElement('div');
hiTemp.setAttribute('id', 'hi-temp');
reHi.appendChild(hiTemp);

const reLow = document.createElement('div');
reLow.setAttribute('id', 'low-div');
reLow.classList.add('vertical');
resultsBot.appendChild(reLow);

const lowText = document.createElement('div');
lowText.setAttribute('id', 'low-text');
lowText.innerText = 'Low';
reLow.appendChild(lowText);

const lowTemp = document.createElement('div');
lowTemp.setAttribute('id', 'low-temp');
reLow.appendChild(lowTemp);

const rePrec = document.createElement('div');
rePrec.setAttribute('id', 'prec-div');
rePrec.classList.add('vertical');
resultsBot.appendChild(rePrec);

const precText = document.createElement('div');
precText.setAttribute('id', 'prec-text');
precText.innerText = 'Precip.';
rePrec.appendChild(precText);

const precChance = document.createElement('div');
precChance.setAttribute('id', 'prec-chance');
rePrec.appendChild(precChance);

// Create city card
async function createCityCard(city) {
    const cityCard = document.createElement('div');
    citySide.appendChild(cityCard);
    cityCard.setAttribute('id', `${city}`)
    cityCard.classList.add('city-card', 'card');
    const cityInfo = await getWeather(city);    

    function createFields(info) {
        const a = document.createElement('div');
        a.classList.add('city-card-name');
        cityCard.appendChild(a);
        const aa = document.createElement('div');
        aa.innerText = info.name;
        a.appendChild(aa);
        const ab = document.createElement('div');
        ab.innerText = `${info.time.substr(-5)}`;
        a.appendChild(ab);

        const b = document.createElement('div');
        b.classList.add('city-card-temp');
        cityCard.appendChild(b);
        b.innerHTML = `${Math.floor(info.tempF)}&#176`;

        const c = document.createElement('div');
        c.classList.add('city-card-icon');
        cityCard.appendChild(c);
        const ca = document.createElement('img');
        ca.setAttribute('src', `https:${info.icon}`);
        c.appendChild(ca);
        };
    createFields(cityInfo);
    return cityCard;
}

// Create results card
async function populateResults(cityInfo) {
    resultsName.innerText = cityInfo.name;
    resultsTime.innerText = `${cityInfo.time.substr(-5)}`;
    const a = document.createElement('img');
    a.setAttribute('src', `https:${cityInfo.icon}`);
    resultsIconImg.innerText = '';
    resultsIconImg.appendChild(a);
    resultsIconText.innerText = cityInfo.condition;
    reTemp.innerHTML = `${Math.floor(cityInfo.tempF)}&#176`;
    hiTemp.innerHTML = `${Math.floor(cityInfo.hi)}&#176`;
    lowTemp.innerHTML = `${Math.floor(cityInfo.low)}&#176`;
    precChance.innerHTML = `${cityInfo.precip}%`;
}

async function searchAndPopulate(city) {
    const info = await getWeather(city);
    if (info) await populateResults(info);
}

async function searchCity(event) {
    errorDiv.classList.add('hide');
    const formData = new FormData(event.target);
    let city = formData.get('search-bar');
    city = city.trim();
    searchAndPopulate(city);
    document.querySelector('form').reset();
    event.preventDefault();
}

// Make sure city cards load in order
async function createCards() {
    const cards = [];
    for (const city of cities) {        
        cards.push(createCityCard(city));
    }
    citySide.appendChild(await Promise.all(cards));
}

// Initialize website
document.querySelector('form').addEventListener('submit', searchCity);
document.addEventListener('DOMContentLoaded', createCards);
searchAndPopulate('New York');