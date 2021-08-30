const jsStringify = require('js-stringify');
const Nea = require('../models/neas_model');

const neas = {

    homeNeas: async (req, res) => {
        const data = await Nea.find();
        res.status(200).render('neas', {
            jsStringify,
            data,
        });
    },
    getNeas: async (req, res) => {
        try {
            const queries = await req.query;

            if (Object.keys(queries) == 0) {
                try {
                    const data = await Nea.find();
                    res.status(200).send(data);
                } catch (error) {
                    res.status(400).json({
                        error: error.message
                    });
                }
            } else if (queries.class) {
                try {
                    const queryClass = await queries.class
                    const data = await Nea.find({})
                        .where({
                            'orbit_class': queryClass
                        })
                    res.status(200).send(data)

                } catch (error) {
                    res.status(400).json({
                        error: error.message
                    });
                }
            } else if (queries.from && queries.to) {
                const queryFrom = await queries.from;
                const queryTo = await queries.to;
                const data = await Nea.find({})
                    .where({
                        'discovery_date': {
                            $gte: queryFrom,
                            $lte: queryTo
                        }
                    })
                res.status(200).send(data);
            } else if (queries.from) {
                const queryFrom = await queries.from;
                const data = await Nea.find({})
                    .where({
                        'discovery_date': {
                            $gte: queryFrom
                        }
                    })
                res.status(200).send(data);

            } else if (queries.to) {
                const queryTo = await queries.to;
                const data = await Nea.find({})
                    .where({
                        'discovery_date': {
                            $lte: queryTo
                        }
                    })
                res.status(200).send(data);
            }
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
};

module.exports = neas