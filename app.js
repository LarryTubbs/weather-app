const yargs = require('yargs');
const moment = require('moment');

const gc = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }   
}).help().alias('h', 'help')
.argv;

// safety against a zero length string
if (argv.a == '') {
    console.log('You must provide an address.  See --help.');
    return;
}

gc.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(`Current weather for ${results.addr}`);
        weather.getWeather(results.lat, results.lng, (wErrorMessage, wResults) => {
            if (wErrorMessage) {
                console.log(`Error retrieving weather data: ${wErrorMessage}`);
            } else {
                console.log(`Current Weather as of ${moment(wResults.dt).format('M/D/YYYY h:m a')}:`);
                console.log(`  ${wResults.conditions}`);
                console.log(`  ${Math.round(wResults.temp)} degrees, feels like: ${Math.round(wResults.apparentTemperature)} degrees`);
                console.log(`  Wind is out of the ${wResults.windDirection} at ${Math.round(wResults.windSpeed)} mph`);
                console.log("Forecast:");
                wResults.forecasts.forEach((day) => {
                    console.log(` ${moment(day.dt).format('dddd,')} ${day.conditions} ${Math.round(day.lowTemp)}-${Math.round(day.highTemp)} degrees. Chance of rain: ${Math.round(day.chanceOfRain)}`);
                });
            };
        }); 
                     
    }
});
