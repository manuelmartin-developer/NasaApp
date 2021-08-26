const fetch = require('node-fetch');

const apollo = {

    getApolloPhotos: async (mission) => {

        const res = await fetch(`https://images-api.nasa.gov/search?q=apollo%20${mission}&year_end=1973&media_type=image`);
        const data = await res.json();
        return data;
    }

};

module.exports = apollo;