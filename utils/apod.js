const fetch = require('node-fetch');

const apod = {

    getApod: async () => {

        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.APOD_KEY}`);
        const pictureObj = await res.json();
        return pictureObj;
    }
};

module.exports = apod;