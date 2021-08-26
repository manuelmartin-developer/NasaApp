const apollo = require('../utils/apollo');

const moon = {
    home: async (req, res) => {
        try {

            const mission = req.query.mission;
            const photos = await apollo.getApolloPhotos(mission);
            res.status(200).render('moon', {
                photos
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}
module.exports = moon;