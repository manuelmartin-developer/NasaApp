const fetch = require('node-fetch');

const ISS = {

    getISS : async () => {

        const res = await fetch ('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await res.json();
        return data;
    }
};

module.exports = ISS;