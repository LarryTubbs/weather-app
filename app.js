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
        console.log(`Current Weather as of ${moment(results.dt).format('M/D/YYYY h:m a')}:`);
        console.log(`Conditions: ${results.conditions}`);
        console.log(`Temperature: ${results.temp} degrees`);
        console.log(`Wind is out of the ${results.windDirection} at ${results.windSpeed} mph`);             
    }
});
