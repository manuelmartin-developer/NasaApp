const jsStringify = require('js-stringify');
const Nea = require('../models/neas_model');

const neas = {

    getNeas: async (req, res) => {
        try {
            const queries = await req.query;

            if (Object.keys(queries) == 0) {
                try {

                    let data = await Nea.find();
                    res.status(200).render('neas', {
                        jsStringify,
                        data
                    });
                } catch (error) {
                    res.status(400).json({
                        error: error.message
                    });
                }
            } else if (queries.class) {
                try {
                    let queryClass = await queries.class
                    if (queryClass !== 'Select a orbit class') {

                        let data = await Nea.find({})
                            .where({
                                'orbit_class': queryClass
                            })
                        res.status(200).render('neas', {
                            jsStringify,
                            data
                        })
                    } else {
                        let data = await Nea.find();
                        res.status(200).render('neas', {
                            jsStringify,
                            data
                        });
                    }

                } catch (error) {
                    res.status(400).json({
                        error: error.message
                    });
                }
            }else if (queries.from && queries.to){
                let queryFrom = await queries.from;
                let queryTo = await queries.to;
                let data = await Nea.find({})
                            .where({
                                'discovery_date': { $gte: queryFrom, $lte: queryTo }
                            })
                        res.status(200).render('neas', {
                            jsStringify,
                            data
                        })
            }else if(queries.from){
                let queryFrom = await queries.from;
                let queryTo = await queries.to;
                let data = await Nea.find({})
                            .where({
                                'discovery_date': { $gte: queryFrom }
                            })
                        res.status(200).render('neas', {
                            jsStringify,
                            data
                        })
                
            }else if(queries.to){
                let queryFrom = await queries.from;
                let queryTo = await queries.to;
                let data = await Nea.find({})
                            .where({
                                'discovery_date': { $lte: queryTo }
                            })
                        res.status(200).render('neas', {
                            jsStringify,
                            data
                        })
            }
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }

};

module.exports = neas