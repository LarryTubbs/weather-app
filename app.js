const yargs = require('yargs');
const moment = require('moment');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }   
}).help().alias('h', 'help')
.argv;

const gc = require('./geocode/geocode');
const weather = require('./weather/weather');

// safety against a zero length string
if (argv.a == '') {
    console.log('You must provide an address.  See --help.');
    return;
}

gc.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(`Address: ${results.addr}`);
        console.log(`Latitude: ${results.lat}`);
        console.log(`Longitude: ${results.lng}`);  
        weather.getWeather(results.lat, results.lng, (wErrorMessage, wResults) => {
            if (wErrorMessage) {
                console.log(`Error retrieving weather data: ${weErrorMessage}`);
            } else {
                console.log(`Current Weather as of ${moment(wResults.dt).format('M/D/YYYY h:m a')}:`);
                console.log(`Conditions: ${wResults.conditions}`);
                console.log(`Temperature: ${wResults.temp} degrees`);
                console.log(`Feels like: ${wResults.apparentTemperature} degrees`);
                console.log(`Wind is out of the ${wResults.windDirection} at ${wResults.windSpeed} mph`);
            };
        }); 
                     
    }
});
