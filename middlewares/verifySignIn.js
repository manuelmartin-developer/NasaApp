const User = require('../models/users_model');
const bcrypt = require("bcryptjs");

checkNicknameAndPassword = (req, res, next) => {
    User.findOne({
        nickname: req.body.nickname
    })
    .populate("roles", "-__v")
    .exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        if (!user) {
            const message = `That nickname does not exist in our database`;
            const href = "location.href='/signin'";
            return res.status(404).render('message', {
                message,
                href
            });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {

            const message = `Invalid password!`;
            const href = "location.href='/signin'";
            return res.status(404).render('message', {
                message,
                href
            });
        }

        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }

        next();
    });
};
const verifySignIn = {
    checkNicknameAndPassword
  };
  
  module.exports = verifySignIn;