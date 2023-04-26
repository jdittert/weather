import { getWeather, Info } from "./api";

const main = document.createElement('main');

async function getData(city) {
    const weather = await getWeather(city)
    const tempF = await weather.current.temp_f;
    const tempC = await weather.current.temp_c;
    const time = await weather.location.localtime;
    const icon = await weather.current.condition.icon;
    console.log(tempF, tempC, time, icon);
    const info = new Info(tempF, tempC, time, icon);
    console.log(info);
    return info;
}

// Create city card
function createCityCard(city) {
    const cityCard = document.createElement('div');
    main.appendChild(cityCard);
    const cityInfo = getData(city);

    function createFields(info) {
        for (const key in info) {
            const a = document.createElement('div');
            a.innerText = key.valueOf;
            cityCard.appendChild(a);
        };
    }
    
}
