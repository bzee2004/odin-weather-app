import { getWeather } from "./handleWeather";
import { getLocality, getLatLong } from "./handleLocation";
import { renderContent } from "./handleRender";
require('./global.css');


const locationForm = document.querySelector('#get-location');
locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const latLong = await getLatLong(location);

    handleSuccess(latLong);
})

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}
else {
    console.log("Geolocation not supported");
}

async function handleSuccess(position) {
    let lat, long;
    
    if (Array.isArray(position)) {
        lat = position[0];
        long = position[1];
        
    }
    else if (typeof position === 'object') {
        lat = position.coords.latitude;
        long = position.coords.longitude;
    }
    else {
        console.error("unknown coordinates");
    }

    // Latitude and longitude override for dev
    // lat = 40.957352;
    // long = -122.841607;
    
    const loader = document.querySelector('#loader');
    loader.showModal();

    const weatherData = await getWeather(lat, long);
    const [city, state] = await getLocality(lat, long);
    renderContent(weatherData, city, state);

    loader.close();
}

function handleError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied geolocation permissions");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location info is unavailable");
            break;
        case error.TIMEOUT:
            console.log("Location request timed out");
            break;
        case error.UNKNOWN_ERROR:
            console.log("Unknown error occurred");
            break;
    }
}

