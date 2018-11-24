const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddr = encodeURIComponent(address);
    var prettyAddr = '';
    var lat = 0;
    var lng = 0;
    
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
            prettyAddr = `${body.results[0].locations[0].adminArea5}, ${body.results[0].locations[0].adminArea3}`;
            lat = body.results[0].locations[0].latLng.lat;
            lng = body.results[0].locations[0].latLng.lng;
            callback(undefined, {
                addr: prettyAddr,
                lat: lat,
                lng: lng
            }); 
        }       
    } ); 
};

module.exports = {
    geocodeAddress
};
