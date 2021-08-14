const jsStringify = require('js-stringify');
const Landing = require('../models/landing_model');

const landings = {

    getAllLandings: async (req, res) => {

        const queries = await req.query;

        if(Object.keys(queries) == 0){
            let data = await Landing.find();
            res.status(200).render('landings', {jsStringify, data});
        }else if(queries.minimum_mass){
            try {
                
                let minimum_mass = await Number(req.query.minimum_mass);
                let data = await Landing.find({mass: { $gte: minimum_mass }});
                res.status(200).render('landings', {jsStringify, data});
            } catch (error) {
                
                res.status(400).json({
                    error: error.message
                });
            }
        }else if(queries.from && queries.to){
            let from = await queries.from;
            let to = await queries.to;
            let data = await Landing.find({year: { $gte: Number(from), $lte: Number(to) }});
            res.status(200).render('landings', {jsStringify, data});
            
        }else if(queries.from){
            let from = await req.query.from;
            let data = await Landing.find({year: { $gte: Number(from) }});
            res.status(200).render('landings', {jsStringify, data});
            
            
        }else if(queries.to){
            let to = await req.query.to;
            let data = await Landing.find({year: { $lte: Number(to) }});
            res.status(200).render('landings', {jsStringify, data});

        }
    },
    getOneLandingMass: async (req, res) => {

        try {
            let mass = await req.params.mass;
            let data = await Landing.find({})
                                    .where({'mass': Number(mass)})
            res.status(200).render('landings', {jsStringify,data});

        } catch (error) {
            
            res.status(400).json({
                error: error.message
            });
        }
    
    },
    getAllLandingClass: async (req, res) => {
        try {
            let recclass = await req.params.class;
            let data = await Landing.find({})
                                    .where({'recclass': recclass})
            res.status(200).render('landings', {jsStringify,data});

        } catch (error) {
            
            res.status(400).json({
                error: error.message
            });
        }
    }
};

module.exports = landings;