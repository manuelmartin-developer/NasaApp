const fetch = require('node-fetch');

const curiosity = {

    getCuriosityPhotos : async () => {

        const res = await fetch (`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?&camera=fhaz&api_key=${process.env.APOD_KEY}`);
        const data = await res.json();
        return data;
    },
    getWeather: async () => {

        const res = await fetch('https://api.maas2.apollorion.com/');
        const weather = await res.json();
        return weather;
    },
    getCuriosityData : async () =>{

        const res = await fetch('https://mars.nasa.gov/maps/location/api/configure/get?mission=MSL');
        const data = await res.json();
        return data;
    }
};

module.exports = curiosity;