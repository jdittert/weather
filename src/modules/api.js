export class Info {
    constructor(name, tempF, tempC, time, icon, hi, low, precip, condition) {
        this.name = name;
        this.tempF = tempF;
        this.tempC = tempC;
        this.time = time;
        this.icon = icon;
        this.hi = hi;
        this.low = low;
        this.precip = precip;
        this.condition = condition;
    }
}

export async function getWeather(city) {
    let weatherData;
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=bbc801c4c8bb401a9eb180203232504&q=${city}&days=5&aqi=no&alerts=no`, {mode: 'cors'});
        if (response.ok) {
            weatherData = await response.json();
        } else {
            throw new Error(`${city} not in database.`);
        };                
    } catch (error) {
        document.querySelector('.error').innerText = error;
        document.querySelector('.error').classList.remove('hide');
    }
    return weatherData;   
}

export async function getData(city) {
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