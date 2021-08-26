const fetch = require('node-fetch');

const curiosity = {

    getWeather: async () => {

        const res = await fetch('https://api.maas2.apollorion.com/');
        const weather = await res.json();
        return weather;
    }
};

module.exports = curiosity;