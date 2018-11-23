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

// safety against a zero length string
if (argv.a == '') {
    console.log('You must provide an address.  See --help.');
    return;
}

//URL Encode the address
var encodedAddr = encodeURIComponent(argv.a);


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
    console.log(JSON.stringify(response, undefined, 2 ));
    if (response.statusCode !== 200) {
        console.log(`HTTP error occurred. Status code returned: ${response.statusCode}: ${response.headers.status}`);
        return;
    }

    // all is well, parse and display results
    console.log(`Address: ${body.results[0].locations[0].street}, ${body.results[0].locations[0].adminArea5}, ${body.results[0].locations[0].adminArea3}`);
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
    console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
} );

