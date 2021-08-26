const jsStringify = require('js-stringify');
const User = require('../models/users_model');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const storage = require('sessionstorage');
const generateToken = require('../middlewares/generateToken');

const db = require("../models/index_model");
const Role = db.role;

const users = {

    users: async (req, res) => {
        try {
            const data = await User.find();
            res.status(200).render('users', {
                jsStringify,
                data
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    register: async (req, res) => {
        try {
            res.status(200).render('register');
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }

    },
    signinPage: async (req, res) => {
        try {
            res.status(200).render('signin');
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }

    },
    signin: async (req, res) => {
        try {
            const user = await User.findOne({
                nickname: req.body.nickname
            })
            const id = user.id
            const nickname = user.nickname

            await generateToken(res, id, nickname);
            storage.setItem('logged', true);
            res.status(200).render('userdashboard', {
                jsStringify,
                user
            });

        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }

    },
    logout: async (req, res) => {
        try {

            const token = req.cookies.token;
            jwt.sign(token, "", {
                expires: 1
            }, (logout, err) => {
                if (logout) {
                    res.cookie('token', token, {
                        expires: new Date(Date.now()),
                        secure: false,
                        httpOnly: true,
                    });
                    storage.removeItem('logged');
                    const message = `You have been Logged Out`
                    const href = "location.href='/'";
                    res.status(201).render('message', {
                        message,
                        href,
                    });
                } else {
                    res.send({
                        msg: 'Error'
                    });
                }
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }

    },
    admindashboard: async (req, res) => {
        try {
            res.status(200).render('admindashboard', {
                jsStringify,
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    search: async (req, res) => {
        try {
            let data = await User.find();

            res.status(200).render('search', {
                jsStringify,
                data,

            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }

    },
    signUp: async (req, res) => {
        try {
            const user = await new User({
                name: req.body.name,
                nickname: req.body.nickname,
                password: bcrypt.hashSync(req.body.password, 8),
                birthdate: req.body.birthdate,
                occupation: req.body.occupation,
                afDate: req.body.afDate,
                deleted: req.body.deleted,
                astronomicalPoints: req.body.astronomicalPoints
            });

            if (req.body.roles) {
                Role.find({
                        name: {
                            $in: req.body.roles
                        }
                    },
                    (err, roles) => {
                        if (err) {
                            res.status(500).send({
                                message: err
                            });
                            return;
                        }

                        user.roles = roles.map(role => role._id);
                        user.save(err => {
                            if (err) {
                                res.status(500).send({
                                    message: err
                                });
                                return;
                            }

                            const newUser = user.save();
                            const message = `Congratulations ${newUser.name}!\\ You are in our team!\
                        Now you can access to your account, remember your affiliated number
                        ${newUser.afNumber}`
                            const href = "location.href='/'";
                            res.status(201).render('message', {
                                jsStringify,
                                newUser,
                                message,
                                href
                            });
                        });
                    }
                );
            } else {
                Role.findOne({
                    name: "user"
                }, (err, role) => {
                    if (err) {
                        res.status(500).send({
                            message: err
                        });
                        return;
                    }

                    user.roles = [role._id];
                    user.save(err => {
                        if (err) {
                            res.status(500).send({
                                message: err
                            });
                            return;
                        }

                        const newUser = user.save();
                        const message = `Congratulations ${user.name}! You are in our team!
                      Now you can access to your account , remember your affiliated number
                      ${user.afNumber}`
                        const href = "location.href='/'";
                        res.status(201).render('message', {
                            jsStringify,
                            newUser,
                            message,
                            href
                        });
                    });
                });
            }

        } catch (error) {
            res.status(400).json({
                error: error.message
            });

        }
    },
    getUserDetails: async (req, res) => {
        try {
            const data = await User.find();
            const afNumber = await req.body.afNumber;
            const userDetails = await User.find({})
                .where({
                    'afNumber': afNumber
                })
            res.status(200).render('search', {
                jsStringify,
                data,
                userDetails,
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    editUser: async (req, res) => {
        try {
            const param = await req.params.afNumber;

            const user = await User.find({})
                .where({
                    'afNumber': param
                })
            res.status(200).render('edituser', {
                jsStringify,
                user
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    updateUser: async (req, res) => {

        const data = await req.body
        try {
            const updatedUser = await User.findOneAndUpdate({
                afNumber: req.params.afNumber
            }, data)
            const message = `Your data are updated!
            Your new nickname is ${data.nickname} and your new
            occupation is ${data.occupation}`;
            const href = "window.history.back()";
            res.status(201).render('message', {
                jsStringify,
                updatedUser,
                message,
                href
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    updateDeletedUser: async (req, res) => {

        const afNumber = await req.params.afNumber
        const href = "window.history.back()";
        try {

            const updatedUser = await User.findOneAndUpdate({
                afNumber: afNumber
            }, {
                deleted: true
            })
            const message = `We miss you so much, ${updatedUser.name} :(
                Your account will be deleted shortly by admin`
            res.status(201).render('message', {
                jsStringify,
                updatedUser,
                message,
                href
            });

        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    },
    deleteUser: async (req, res) => {
        const afNumber = await req.params.afNumber
        const userToDelete = await User.findOne({
            afNumber: afNumber
        });
        if (userToDelete.deleted === true) {
            try {
                const deletedUser = await User.findOneAndDelete({
                    afNumber: afNumber
                })
                const message = `User with # ${afNumber} has been deleted`;
                const href = "window.history.back()";
                res.status(201).render('message', {
                    jsStringify,
                    deletedUser,
                    message,
                    href
                });
            } catch (error) {
                res.status(400).json({
                    error: error.message
                });
            }

        } else {
            try {
                const message = `To delete a user he must have requested it before`;
                const href = "window.history.back()";
                res.status(200).render('message', {
                    jsStringify,
                    message,
                    href
                });
            } catch (error) {

            }
        }
    }

};

module.exports = users;