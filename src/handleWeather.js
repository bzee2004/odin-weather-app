
class WeatherConditions {

    constructor(dayData) {
        this.date = dayData.datetime;
        this.condition = dayData.conditions;
        this.conditionIcon = dayData.icon;
        this.temp = {
            current: Math.floor(dayData.temp),
            max: Math.floor(dayData.tempmax),
            min: Math.floor(dayData.tempmin)
        };
        
        this.rain = {
            current: dayData.precip,
            probability: dayData.precipprob
        };
    }
}

class WeatherCurrent extends WeatherConditions {

    alerts = [];

    constructor(dayData) {
        super(dayData);

        this.description = dayData.description;
        this.humidity = dayData.humidity;
        this.feelsLike = Math.floor(dayData.feelslike);

        this.sun = {
            rise: dayData.sunrise,
            set: dayData.sunset
        };
        
        this.wind = {
            speed: dayData.windspeed,
            direction: dayData.winddir,
            gust: dayData.windgust
        };
    }

    setInitialValues(alerts) {
        this.alerts = alerts;
    }
}

export async function getWeather(lat, long) {
    const weatherQuery = 
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
    + lat + '%2C' + long
    + '?unitGroup=us&maxDistance=8047&key=FVCBP7F9BVZ3BPSPMEMRA2ZC9&contentType=json';

    const weatherResponse = await fetch(weatherQuery);
    const weatherData = await weatherResponse.json();

    const weatherArr = [];

    // Create current data object and push to weather array
    const currentWeather = new WeatherCurrent(weatherData.currentConditions);
    currentWeather.setInitialValues(weatherData.alerts);
    weatherArr.push(currentWeather);

    // Create forecast data object and push to weather array
    weatherData.days.forEach(day => {
        weatherArr.push(new WeatherConditions(day))
    });

    return weatherArr;

}