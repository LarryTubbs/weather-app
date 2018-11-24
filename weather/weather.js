const request = require('request');
const util = require('./utilities');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/e29e17d59a7ea4d1e9fb20258895e3c7/${lat},${lng}?exclude=minutely,hourly`,
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
            var forecasts = [];
            body.daily.data.forEach((day) => {
                forecasts.push({
                    dt: day.time*1000,
                    conditions: day.summary,
                    lowTemp: day.temperatureLow,
                    highTemp: day.temperatureHigh,
                    chanceOfRain: day.precipProbability
                })
            })

            callback(undefined, {
                dt: body.currently.time*1000,
                conditions: body.currently.summary,
                temp: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                windDirection: util.calculateDirection(body.currently.windBearing),
                windSpeed: body.currently.windSpeed,
                forecasts: forecasts
            });
        }
    });
}

module.exports = {
    getWeather
};
