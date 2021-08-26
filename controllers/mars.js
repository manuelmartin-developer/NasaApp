const jsStringify = require('js-stringify');
const perseverance = require('../utils/perseverance');
const curiosity = require('../utils/curiosity');


const mars = {
    home: async (req, res) => {
        try {
            const photos = await perseverance.getPerseverancePhotos();
            const data = await perseverance.getPerseveranceData();
            const weather = await curiosity.getWeather();
            res.status(200).render('mars', {
                jsStringify,
                photos,
                data,
                weather
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}
module.exports = mars;