const jsStringify = require('js-stringify');
const perseverance = require('../utils/perseverance');

const mars = {
    home: async (req, res) => {

        const photos = await perseverance.getPerseverancePhotos();
        const data = await perseverance.getPerseveranceData();
        res.status(200).render('mars', {
            jsStringify,
                photos,
                data
        });
    }
}
module.exports = mars;