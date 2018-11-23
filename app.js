const request = require('request');
const yargs = require('yargs');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }   
}).help().alias('h', 'help')
.argv;

var calculateDirection = (wd) => {

    if (wd >= 0 && wd <= 11.25)

    {
    
    var dir = "N";
    
    }
    
    if (wd > 348.75 && wd <= 360)
    
    {
    
    var dir = "N";
    
    }
    
    if (wd > 11.25 && wd <= 33.75)
    
    {
    
    var dir = "NNE";
    
    }
    
    if (wd > 33.75 && wd <= 56.25)
    
    {
    
    var dir = "NE";
    
    }
    
    if (wd > 56.25 && wd <= 78.75)
    
    {
    
    var dir = "ENE";
    
    }
    
    if (wd > 78.75 && wd <= 101.25)
    
    {
    
    var dir = "E";
    
    }
    
    if (wd > 101.25 && wd <= 123.75)
    
    {
    
    var dir = "ESE";
    
    }
    
    if (wd > 123.75 && wd <= 146.25)
    
    {
    
    var dir = "SE";
    
    }
    
    if (wd > 146.25 && wd <= 168.75)
    
    {
    
    var dir = "SSE";
    
    }
    
    if (wd > 168.75 && wd <= 191.25)
    
    {
    
    var dir = "S";
    
    }
    
    if (wd > 191.25 && wd <= 213.75)
    
    {
    
    var dir = "SSW";
    
    }
    
    if (wd > 213.75 && wd <= 236.25)
    
    {
    
    var dir = "SW";
    
    }
    
    if (wd > 236.25 && wd <= 258.75)
    
    {
    
    var dir = "WSW";
    
    }
    
    if (wd > 258.75 && wd <= 281.25)
    
    {
    
    var dir = "W";
    
    }
    
    if (wd > 281.25 && wd <= 303.75)
    
    {
    
    var dir = "WNW";
    
    }
    
    if (wd > 303.75 && wd <= 326.25)
    
    {
    
    var dir = "NW";
    
    }
    
    if (wd > 326.25 && wd <= 348.75)
    
    {
    
    var dir = "NNW";
    
    }
    
    return dir;
};


// safety against a zero length string
if (argv.a == '') {
    console.log('You must provide an address.  See --help.');
    return;
}

//URL Encode the address
var encodedAddr = encodeURIComponent(argv.a);
var prettyAddr = '';
var lat = 0;
var lng = 0;

request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=8QZrP4Tm2GyfGDJsaWuiurKa4AeP9kxc&location=${encodedAddr}`,
    json: true
}, (error, response, body) => {
    // handle request error
    if (error) {
        console.log('Error connecting to mapping service.');
        console.log('Error txt:');
        console.log(error);
        return;
    }
    
    // handle response error
    if (response.statusCode !== 200) {
        console.log(`HTTP error occurred. Status code returned: ${response.statusCode}: ${response.headers.status}`);
        return;
    }

    // all is well, parse and display results
    prettyAddr = `${body.results[0].locations[0].street}, ${body.results[0].locations[0].adminArea5}, ${body.results[0].locations[0].adminArea3}`;
    console.log(`Address: ${prettyAddr}`);
    lat = body.results[0].locations[0].latLng.lat;
    console.log(`Latitude: ${lat}`);
    lng = body.results[0].locations[0].latLng.lng;
    console.log(`Longitude: ${lng}`);

    request({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&APPID=f9050cae6fed5b9efd50a80b4fe6bc48`,
        json: true
    },
    (error, response, body) => {
        // handle request error
        if (error) {
            console.log('Error connecting to weather service.');
            console.log('Error txt:');
            console.log(error);
            return;
        }
        
        // handle response error
        if (response.statusCode !== 200) {
            console.log(`HTTP error occurred. Status code returned: ${response.statusCode}: ${response.headers.status}`);
            return;
        }

        // all is well, parse and display results
        console.log(`Current Weather as of ${body.dt}:`);
        console.log(`Conditions: ${body.weather[0].main}`);
        console.log(`Temperature: ${body.main.temp} degrees`);
        // body.wind.deg
        var direction = calculateDirection(body.wind.deg);
        console.log(`Wind is out of the ${direction} at ${body.wind.speed} mph`);
        
    });
} );



