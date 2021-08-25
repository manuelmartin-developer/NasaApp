const fetch = require('node-fetch');

const perseverance = {

    getPerseverancePhotos : async () => {

        const res = await fetch (`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=${process.env.APOD_KEY}`);
        const data = await res.json();
        return data;
    },

    getPerseveranceData : async () =>{

        const res = await fetch('https://mars.nasa.gov/maps/location/api/configure/get?mission=M20');
        const data = await res.json();
        return data;
    }
};

module.exports = perseverance;