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

const searchBar = document.createElement('input');
searchBar.setAttribute('id', 'search-bar');
searchBar.setAttribute('type', 'text');
searchBar.setAttribute('placeholder', 'Search for a city...');
searchForm.appendChild(searchBar)

const searchButton = document.createElement('button');
searchButton.setAttribute('type', 'submit');
searchButton.innerText = 'Search';
searchForm.appendChild(searchButton);

formDiv.appendChild(searchForm);
searchSide.appendChild(formDiv);

async function getData(city) {
    const weather = await getWeather(city)
    const name = await weather.location.name;
    const tempF = await weather.current.temp_f;
    const tempC = await weather.current.temp_c;
    const time = await weather.location.localtime;
    const icon = await weather.current.condition.icon;
    const info = new Info(name, tempF, tempC, time, icon);
    console.log(info);
    return info;
}

// Create city card
async function createCityCard(city) {
    const cityCard = document.createElement('div');
    main.appendChild(cityCard);
    cityCard.setAttribute('id', `${city}`)
    cityCard.classList.add('city-card');
    const cityInfo = await getData(city);
    createFields(cityInfo);

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
        b.innerText = `${Math.floor(info.tempF)}`

        const c = document.createElement('div');
        c.classList.add('city-card-icon');
        cityCard.appendChild(c);
        const ca = document.createElement('img');
        ca.setAttribute('src', `https:${info.icon}`);
        c.appendChild(ca);
        };     
    citySide.appendChild(cityCard);
}

cities.forEach(city => createCityCard(city));