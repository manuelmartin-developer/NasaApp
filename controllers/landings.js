const jsStringify = require('js-stringify');
const Landing = require('../models/landing_model');
const ISS = require('../utils/iss');

const landings = {

    getAllLandings: async (req, res) => {

        const queries = await req.query;

        if (Object.keys(queries) == 0) {
            const iss = await ISS.getISS();
            const data = await Landing.find();
            res.status(200).render('landings', {
                jsStringify,
                data,
                iss
            });
        } else if (queries.minimum_mass) {
            try {

                const iss = await ISS.getISS();
                const minimum_mass = await Number(req.query.minimum_mass);
                const data = await Landing.find({
                    mass: {
                        $gte: minimum_mass
                    }
                });
                res.status(200).render('landings', {
                    jsStringify,
                    data,
                    iss
                });
            } catch (error) {

                res.status(400).json({
                    error: error.message
                });
            }
        } else if (queries.from && queries.to) {
            const iss = await ISS.getISS();
            const from = await queries.from;
            const to = await queries.to;
            const data = await Landing.find({
                year: {
                    $gte: Number(from),
                    $lte: Number(to)
                }
            });
            res.status(200).render('landings', {
                jsStringify,
                data,
                iss
            });

        } else if (queries.from) {
            const iss = await ISS.getISS();
            const from = await req.query.from;
            const data = await Landing.find({
                year: {
                    $gte: Number(from)
                }
            });
            res.status(200).render('landings', {
                jsStringify,
                data,
                iss
            });


        } else if (queries.to) {
            const iss = await ISS.getISS();
            const to = await req.query.to;
            const data = await Landing.find({
                year: {
                    $lte: Number(to)
                }
            });
            res.status(200).render('landings', {
                jsStringify,
                data,
                iss
            });

        }
    },
    getOneLandingMass: async (req, res) => {

        try {
            const iss = await ISS.getISS();
            const mass = await req.params.mass;
            const data = await Landing.find({})
                .where({
                    'mass': Number(mass)
                })
            res.status(200).render('landings', {
                jsStringify,
                data,
                iss
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });
        }

    },
    getAllLandingClass: async (req, res) => {
        try {
            const iss = await ISS.getISS();
            const recclass = await req.params.class;
            const data = await Landing.find({})
                .where({
                    'recclass': recclass
                })
            res.status(200).render('landings', {
                jsStringify,
                data,
                iss
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });
        }
    }
};

module.exports = landings;