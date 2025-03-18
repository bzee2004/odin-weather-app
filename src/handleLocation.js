export async function getLocality(lat, long) {
    const localityQuery = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=locality&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const localityResponse = await fetch(localityQuery);
    const localityArr = await localityResponse.json();

    const status = localityArr.status;
    // const compoundCode = localityArr.plus_code.compound_code;

    if (status !== 'ZERO_RESULTS') {
        const formattedAddress = localityArr.results[0].formatted_address;

        const city = formattedAddress.slice(0, formattedAddress.indexOf(','));

        let state = formattedAddress.slice(formattedAddress.indexOf(', ')+2);
        state = state.slice(0, state.indexOf(','));
        return [city, state];
    }
    return ["Unknown", "Unknown"];
}

export async function getLatLong(location) {
    const geocodeQuery = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const geocodeResponse = await fetch(geocodeQuery);
    const geocodeResult = await geocodeResponse.json();

    if (geocodeResult.status !== 'OK') {
        return [0, 0];
    }

    const {lat, lng} = geocodeResult.results[0].geometry.location;
    return [lat, lng];
}