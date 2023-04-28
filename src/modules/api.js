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
        if (!city) {
            throw new Error('Search field left blank.');
        };

        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=bbc801c4c8bb401a9eb180203232504&q=${city}&days=5&aqi=no&alerts=no`, {mode: 'cors'});
        if (response.ok) {
            weatherData = await response.json();
            const name = await weatherData.location.name;
            const tempF = await weatherData.current.temp_f;
            const tempC = await weatherData.current.temp_c;
            const time = await weatherData.location.localtime;
            const icon = await weatherData.current.condition.icon;
            const hi = await weatherData.forecast.forecastday[0].day.maxtemp_f;
            const low = await weatherData.forecast.forecastday[0].day.mintemp_f;
            const precip = await weatherData.forecast.forecastday[0].day.daily_chance_of_rain;
            const condition = await weatherData.current.condition.text;
            const info = new Info(name, tempF, tempC, time, icon, hi, low, precip, condition);
            return info;
        } 
            throw new Error(`"${city}" not in database.`);
    ;                
    } catch (error) {
        document.querySelector('.error').innerText = error;
        document.querySelector('.error').classList.remove('hide');
    }  
}