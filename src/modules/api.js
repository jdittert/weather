export default async function getWeather(city) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=bbc801c4c8bb401a9eb180203232504&q=${city}&aqi=no`, {mode: 'cors'});
        if (response.ok) {
            const weatherData = await response.json();
            console.log(weatherData);
        } else {
            throw new Error(`${city} not in database.`);
        };        
    } catch (error) {
        console.log(error);
    }
    
}