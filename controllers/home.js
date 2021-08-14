const apod = require('../utils/apod');

const home = {
    home: async (req, res) => {

        const pictureObj = await apod.getApod();
        res.status(200).render('home', {pictureObj});//! Revisar numero de estatus
    }
}
module.exports = home;