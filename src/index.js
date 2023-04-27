import './style.css'
import { getWeather, Info } from "./modules/api";

const cities = ['Los Angeles', 'Chicago', 'New York', 'London', 'Berlin'];

const main = document.createElement('main');
main.setAttribute('id', 'main');
document.body.appendChild(main);

const citySide = document.createElement('div');
citySide.setAttribute('id', 'city-side');
citySide.classList.add('city-side');
main.appendChild(citySide);

const searchSide = document.createElement('div');
searchSide.setAttribute('id', 'search-side');
searchSide.classList.add('search-side');
main.appendChild(searchSide);

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

const errorDiv = document.createElement('div');
errorDiv.setAttribute('id', 'error');
errorDiv.classList.add('error', 'hide');
errorDiv.innerText = 'City not in database.';
searchSide.appendChild(errorDiv);

const resultsDiv = document.createElement('div');
resultsDiv.setAttribute('id', 'results-div');
resultsDiv.classList.add('results-div');
searchSide.appendChild(resultsDiv);

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

// eslint-disable-next-line consistent-return
// async function getData(city) {
//     const weather = await getWeather(city)
//     if (weather) {
//     const name = await weather.location.name;
//     const tempF = await weather.current.temp_f;
//     const tempC = await weather.current.temp_c;
//     const time = await weather.location.localtime;
//     const icon = await weather.current.condition.icon;
//     const hi = await weather.forecast.forecastday[0].day.maxtemp_f;
//     const low = await weather.forecast.forecastday[0].day.mintemp_f;
//     const precip = await weather.forecast.forecastday[0].day.daily_chance_of_rain;
//     const condition = await weather.current.condition.text;
//     const info = new Info(name, tempF, tempC, time, icon, hi, low, precip, condition);
//     return info;
//     }
// }

// Create cards
function createBlankCards() {
    cities.forEach((city) => {
        const cityCard = document.createElement('div');
        citySide.appendChild(cityCard);
        cityCard.setAttribute('id', `${city}`)
        cityCard.classList.add('city-card');
    });
}

// Create city card
async function createCityCard(city) {
    const cityCard = document.getElementById(city);
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
    citySide.appendChild(cityCard);
}

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

document.querySelector('form').addEventListener('submit', searchCity);

createBlankCards();
cities.forEach(city => createCityCard(city));

// populateResults(getWeather('New York'));

searchAndPopulate('New York');