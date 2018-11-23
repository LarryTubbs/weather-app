var calculateDirection = (wd) => {

    if (wd >= 0 && wd <= 11.25) {

        var dir = "N";

    }

    if (wd > 348.75 && wd <= 360) {

        var dir = "N";

    }

    if (wd > 11.25 && wd <= 33.75) {

        var dir = "NNE";

    }

    if (wd > 33.75 && wd <= 56.25) {

        var dir = "NE";

    }

    if (wd > 56.25 && wd <= 78.75) {

        var dir = "ENE";

    }

    if (wd > 78.75 && wd <= 101.25) {

        var dir = "E";

    }

    if (wd > 101.25 && wd <= 123.75) {

        var dir = "ESE";

    }

    if (wd > 123.75 && wd <= 146.25) {

        var dir = "SE";

    }

    if (wd > 146.25 && wd <= 168.75) {

        var dir = "SSE";

    }

    if (wd > 168.75 && wd <= 191.25) {

        var dir = "S";

    }

    if (wd > 191.25 && wd <= 213.75) {

        var dir = "SSW";

    }

    if (wd > 213.75 && wd <= 236.25) {

        var dir = "SW";

    }

    if (wd > 236.25 && wd <= 258.75) {

        var dir = "WSW";

    }

    if (wd > 258.75 && wd <= 281.25) {

        var dir = "W";

    }

    if (wd > 281.25 && wd <= 303.75) {

        var dir = "WNW";

    }

    if (wd > 303.75 && wd <= 326.25) {

        var dir = "NW";

    }

    if (wd > 326.25 && wd <= 348.75) {

        var dir = "NNW";

    }
    
    return dir;
};

module.exports = {
    calculateDirection
};
