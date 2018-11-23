const request = require('request');

const util = require('../utilities');

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
        }
        
        // handle response error
        if (response.statusCode !== 200) {
            callback(`HTTP error occurred. Status code returned: ${response.statusCode}: ${response.headers.status}`);
        }
    
        // all is well, parse and display results
        prettyAddr = `${body.results[0].locations[0].street}, ${body.results[0].locations[0].adminArea5}, ${body.results[0].locations[0].adminArea3}`;
        lat = body.results[0].locations[0].latLng.lat;
        lng = body.results[0].locations[0].latLng.lng;
        
        request({
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&APPID=f9050cae6fed5b9efd50a80b4fe6bc48`,
            json: true
        },
        (error, response, body) => {
            // handle request error
            if (error) {
                callback('Error connecting to mapping service.');
            }
            
            // handle response error
            if (response.statusCode !== 200) {
                callback(`HTTP error occurred. Status code returned: ${response.statusCode}: ${response.headers.status}`);
            }
        
            // all is well, parse and display results
            dt = body.dt;
            conditions = body.weather[0].main;
            temp = body.main.temp;
            windDirection = util.calculateDirection(body.wind.deg);
            windSpeed = body.wind.speed;
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
        });        
    } );
    
};

module.exports = {
    geocodeAddress
};
