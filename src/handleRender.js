
export function renderContent(weatherData, city, state) {

    renderLocality(city, state);

    const currentWeather = weatherData.slice(0, 2);
    renderCurrentWeather(currentWeather);

    const alerts = currentWeather[0].alerts;
    renderAlerts(alerts);

    const feelsLike = currentWeather[0].feelsLike;
    renderFeelsLike(feelsLike);

    const rain = currentWeather[0].rain;
    renderRain(rain);

    const wind = currentWeather[0].wind;
    renderWind(wind);

    const sun = currentWeather[0].sun;
    renderSun(sun);

    const forecastWeather = weatherData.slice(2);
    renderForecastWeather(forecastWeather);
}


function renderLocality(city, state) {
    const locality = document.querySelector('.locality');
    locality.textContent = '';

    const title = document.createElement('h1');
    title.textContent = `${city}, ${state}`;

    locality.append(title);
}

async function renderCurrentWeather(currentData) {

    const currentWeather = currentData[0];
    const currentForecast = currentData[1];

    const conditionsElem = document.querySelector('.conditions');
    conditionsElem.textContent = '';

    // Handle rendering current condition icon
    const conditionsIcon = document.createElement('img');
    conditionsIcon.setAttribute('id', 'weather-icon');

    const iconName = currentWeather.conditionIcon;
    let icon;
    try {
        icon = (await import(`/assets/${iconName}.png`)).default;
    }
    catch(err) {
        icon = (await import(`/assets/default.png`)).default;
    }
    conditionsIcon.src = icon;
    conditionsIcon.alt = iconName;
    //

    const conditionsText = document.createElement('div');
    conditionsText.setAttribute('id', 'conditions-text');
    
    // Handle rendering condition titles
    const conditionTitle = document.createElement('h1');
    conditionTitle.setAttribute('id', 'condition-title')
    conditionTitle.textContent = currentWeather.condition;
    //


    // Handle rendering current temperatures; no highs or lows in current weather, so take from forecast
    const tempElem = document.createElement('div');
    tempElem.setAttribute('id', 'temperature-box');

    const curTempElem = document.createElement('h2');
    const forecastedTempElem = document.createElement('p');

    const tempCurrent = currentWeather.temp.current;
    const tempHigh = currentForecast.temp.max;
    const tempLow  = currentForecast.temp.min;

    curTempElem.textContent = tempCurrent + '°F';
    forecastedTempElem.textContent = `L: ${tempLow}°F - H: ${tempHigh}°F`;
    
    tempElem.append(curTempElem, forecastedTempElem);
    //

    conditionsText.append(conditionTitle, tempElem);

    // Finally, append all children
    conditionsElem.append(conditionsIcon, conditionsText);
}


function renderAlerts(alerts) {
    const alertsElem = document.querySelector('.alerts');
    alertsElem.textContent = '';

    const alertTitle = document.createElement('h1');
    alertTitle.textContent = 'Alerts';

    const alertBox = document.createElement('div');

    if (alerts.length > 0) {
        alerts.forEach(alert => {
            const alertContentTitle = document.createElement('h2');
            const alertContentBody = document.createElement('p');
            const alertLearnMore = document.createElement('a');

            alertContentTitle.textContent = alert.event;
            alertContentBody.textContent = alert.headline;
            alertLearnMore.textContent = 'Learn more';
            alertLearnMore.href = alert.link;
    
            alertBox.append(alertContentTitle, alertContentBody, alertLearnMore);
        });
    }
    else {
        const alertContentTitle = document.createElement('h2');
        alertContentTitle.textContent = "No events today";

        alertBox.append(alertContentTitle);
    }

    alertsElem.append(alertTitle, alertBox);
}


function renderFeelsLike(feelsLike) {
    const feelsLikeElem = document.querySelector('.feels-like');
    feelsLikeElem.textContent = '';
    
    const feelsLikeTitle = document.createElement('h1');
    const feelsLikeText = document.createElement('p');

    feelsLikeTitle.textContent = 'Feels like:';
    feelsLikeText.textContent = `${feelsLike}°F`;

    feelsLikeElem.append(feelsLikeTitle, feelsLikeText);
}


function renderRain(rain) {
    const precipElem = document.querySelector('.precipitation');
    precipElem.textContent = '';

    const rainTitle = document.createElement('h1');
    rainTitle.textContent = 'Rain';

    const rainCur = rain.current;
    const rainProb = rain.probability;

    const rainCurText = document.createElement('p');
    const rainProbText = document.createElement('p');

    rainCurText.textContent = `Current: ${rainCur}"`;
    rainProbText.textContent = `Probability: ${rainProb}%`;

    precipElem.append(rainTitle, rainCurText, rainProbText);
}


function renderWind(wind) {
    const windElem = document.querySelector('.wind');
    windElem.textContent = '';

    const windTitle = document.createElement('h1');
    windTitle.textContent = 'Wind';

    const windSpd = wind.speed;
    const windDir = wind.direction;
    const windGust = wind.gust;

    const windSpdText = document.createElement('p');
    const windDirText = document.createElement('p');
    const windGustText = document.createElement('p');

    windSpdText.textContent = `Speed: ${windSpd}mph`;
    windDirText.textContent = `Direction: ${windDir}°`;
    windGustText.textContent = `Gust: ${windGust}mph`;

    windElem.append(windTitle, windSpdText, windDirText, windGustText);
}


function renderSun(sun) {
    const sunElem = document.querySelector('.sun-states');
    sunElem.textContent = ''; 

    const sunsetBox = document.createElement('div');
    const sunsetTitle = document.createElement('h1');
    const sunsetSubtitle = document.createElement('p');

    const sunriseBox = document.createElement('div');
    const sunriseTitle = document.createElement('h1');
    const sunriseSubtitle = document.createElement('p');

    const curDate = new Date();
    const curTime = curDate.toLocaleTimeString('it-IT');

    const sunsetDate = new Date();
    let [hrs, mins, secs] = sun.set.split(':');
    sunsetDate.setHours(hrs, mins, secs)
    const sunsetTime = sunsetDate.toLocaleTimeString('en-us', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const sunriseDate = new Date();
    [hrs, mins, secs] = sun.rise.split(':');
    sunriseDate.setHours(hrs, mins, secs);
    const sunriseTime = sunriseDate.toLocaleTimeString('en-us', {
        hour: '2-digit',
        minute: '2-digit'
    });

    sunsetTitle.textContent = 'Sunset';
    sunsetSubtitle.textContent = sunsetTime;
    sunsetBox.append(sunsetTitle, sunsetSubtitle);

    sunriseTitle.textContent = 'Sunrise';
    sunriseSubtitle.textContent = sunriseTime;
    sunriseBox.append(sunriseTitle, sunriseSubtitle);

    if (curTime < sun.set) {
        sunsetTitle.style.fontSize = '1.3rem';
        sunriseTitle.style.fontSize = '1rem';
        sunElem.append(sunsetBox, sunriseBox);
    } else {
        sunriseTitle.style.fontSize = '1.3rem';
        sunsetTitle.style.fontSize = '1rem';
        sunElem.append(sunriseBox, sunsetBox);
    }
}  


async function renderForecastWeather(forecastData) {
    const forecastElem = document.querySelector('.forecast-conditions');
    forecastData.forEach(async (day) => {
        const forecastBox = document.createElement('div');
        const forecastIcon = document.createElement('img');
        const forecastTemps = document.createElement('p');
        const forecastRain = document.createElement('p');

        const lineBreak = document.createElement('br');

        // Render icon
        let icon;
        try {
            icon = (await import(`/assets/${day.conditionIcon}.png`)).default;
        }
        catch(err) {
            icon = (await import(`/assets/default.png`)).default;
        }
        forecastIcon.src = icon;
        forecastIcon.alt = day.icon;

        // Render temps
        forecastTemps.textContent = `${day.temp.max}°F - ${day.temp.min}°F`;

        // Render rain if there is any
        const rainProb = day.rain.probability;
        if (rainProb > 0) {
            forecastRain.textContent = `${rainProb}% for Rain`;
        }
        forecastRain.style.color = "lightblue";

        forecastBox.append(forecastIcon, forecastTemps, forecastRain);
        forecastElem.append(forecastBox);
    });
}