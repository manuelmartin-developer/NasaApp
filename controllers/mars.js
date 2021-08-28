const jsStringify = require('js-stringify');
const perseverance = require('../utils/perseverance');
const curiosity = require('../utils/curiosity');


const mars = {
    home: async (req, res) => {
        try {
            const perseverancePhotos = await perseverance.getPerseverancePhotos();
            const curiosityPhotos = await curiosity.getCuriosityPhotos();
            const perseveranceData = await perseverance.getPerseveranceData();
            const curiosityData = await curiosity.getCuriosityData();
            const weather = await curiosity.getWeather();
            res.status(200).render('mars', {
                jsStringify,
                perseverancePhotos,
                perseveranceData,
                curiosityPhotos,
                curiosityData,
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