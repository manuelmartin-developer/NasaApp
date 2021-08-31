const jsStringify = require('js-stringify');
const Landing = require('../models/landing_model');
const ISS = require('../utils/iss');

const landings = {

    homeLandings: async (req, res) => {
        const iss = await ISS.getISS();
        const data = await Landing.find();
        res.status(200).render('landings', {
            jsStringify,
            data,
            iss
        });
    },
    getAllLandings: async (req, res) => {
        
        const queries = await req.query;
        
        if (Object.keys(queries) == 0) {
            const data = await Landing.find();
            res.status(200).json(data);
        } 
        if (queries.minimum_mass) {
            try {

                const minimum_mass = await Number(req.query.minimum_mass);
                const data = await Landing.find({
                    mass: {
                        $gte: minimum_mass
                    }
                });
                res.status(200).json(data);
            } catch (error) {

                res.status(400).json({
                    error: error.message
                });
            }
        } else if (queries.from && queries.to) {
            const from = await queries.from;
            const to = await queries.to;
            const data = await Landing.find({
                year: {
                    $gte: Number(from),
                    $lte: Number(to)
                }
            });
            res.status(200).send(data);

        } else if (queries.from) {
            const from = await req.query.from;
            const data = await Landing.find({
                year: {
                    $gte: Number(from)
                }
            });
            res.status(200).json(data);


        } else if (queries.to) {
            const to = await req.query.to;
            const data = await Landing.find({
                year: {
                    $lte: Number(to)
                }
            });
            res.status(200).json(data);

        }
    },
    getOneLandingMass: async (req, res) => {

        try {
            const mass = await req.params.mass;
            const data = await Landing.find({})
                .where({
                    'mass': Number(mass)
                })
            res.status(200).json(data);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });
        }

    },
    getAllLandingClass: async (req, res) => {
        try {
            const recclass = await req.params.class;
            const data = await Landing.find({})
                .where({
                    'recclass': recclass
                })
            res.status(200).json(data);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });
        }
    }
};

module.exports = landings;