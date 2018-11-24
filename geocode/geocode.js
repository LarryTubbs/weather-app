const request = require('request');

const util = require('./utilities');

var geocodeAddress = (address, callback) => {
    var encodedAddr = encodeURIComponent(address);
    var prettyAddr = '';
    var lat = 0;
    var lng = 0;
    var dt = 0;
    var conditions = '';
    var temp = 0;
    var windDirection = '';
    var windSpeed = 0;
    
    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=8QZrP4Tm2GyfGDJsaWuiurKa4AeP9kxc&location=${encodedAddr}`,
        json: true
    }, (error, response, body) => {
        // handle request error
        if (error) {
            callback('Error connecting to mapping service.');
        } else if (response.statusCode !== 200) {
            // handle response error
            callback(`HTTP error occurred. Status code returned: ${response.statusCode}: ${response.headers.status}`);
        } else {
            // all is well, parse and display results
            prettyAddr = `${body.results[0].locations[0].street}, ${body.results[0].locations[0].adminArea5}, ${body.results[0].locations[0].adminArea3}`;
            lat = body.results[0].locations[0].latLng.lat;
            lng = body.results[0].locations[0].latLng.lng;

            request({
                url: `https://api.darksky.net/forecast/e29e17d59a7ea4d1e9fb20258895e3c7/${lat},${lng}`,
                json: true
            },
            (error, response, body) => {
                // handle request error
                if (error) {
                    callback('Error connecting to weather service.');
                } else if (response.statusCode !== 200) {
                    callback(`Weather service returned an HTTP error: ${response.statusCode}: ${response.headers.status}`);
                } else if (body.error) {
                    callback(`Weather service returned an error: ${body.error}`);
                } else {
                    // all is well, parse and display results
                    dt = body.currently.time*1000;
                    conditions = body.currently.summary;
                    temp = body.currently.temperature;
                    windDirection = util.calculateDirection(body.currently.windBearing);
                    windSpeed = body.currently.windSpeed;
                    callback(undefined, {
                        addr: prettyAddr,
                        lat: lat,
                        lng: lng,
                        dt: dt,
                        conditions: conditions,
                        temp: temp,
                        windDirection: windDirection,
                        windSpeed, windSpeed
                    });
                }
            }); 
        }       
    } ); 
};

module.exports = {
    geocodeAddress
};
