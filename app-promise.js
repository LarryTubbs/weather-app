const yargs = require('yargs');
const moment = require('moment');
const axios = require('axios');

const util = require('./weather/utilities');

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

var encodedAddr = encodeURIComponent(argv.a);
var geocodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=8QZrP4Tm2GyfGDJsaWuiurKa4AeP9kxc&location=${encodedAddr}`;

axios.get(geocodeURL).then( (response) => {
    var prettyAddr = `${response.data.results[0].locations[0].adminArea5}, ${response.data.results[0].locations[0].adminArea3}`;
    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;
    console.log(`Weather for ${prettyAddr}`);
    var weatherURL = `https://api.darksky.net/forecast/e29e17d59a7ea4d1e9fb20258895e3c7/${lat},${lng}?exclude=minutely,hourly`;
    return axios.get(weatherURL);    
}).then( (response) => {
    console.log(`Current Weather as of ${moment(response.data.currently.time).format('M/D/YYYY h:m a')}:`);
    console.log(`  ${response.data.currently.summary}`);
    console.log(`  ${Math.round(response.data.currently.temperature)} degrees, feels like: ${Math.round(response.data.currently.apparentTemperature)} degrees`);
    console.log(`  Wind is out of the ${util.calculateDirection(response.data.currently.windBearing)} at ${Math.round(response.data.currently.windSpeed)} mph`);
    console.log("Forecast:");
    response.data.daily.data.forEach((day) => {
         console.log(` ${moment(day.time*1000).format('dddd,')} ${day.summary} ${Math.round(day.temperatureLow)}-${Math.round(day.temperatureHigh)} degrees. Chance of rain: ${Math.round(day.precipProbability)}`);
    });
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Error connecting to API servers.');
    } else { 
        console.log(e.message);
    }
});
