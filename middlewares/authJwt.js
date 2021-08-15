const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models/index_model");
const ROLE = db.role;
const User = require('../models/users_model');


verifyToken = (req, res, next) => {

  const token = req.cookies.token || req.headers["x-access-token"];

  if (!token) {
    const message = `No Token`;
    const href = "location.href='/signin'";
    return res.status(401).render('message', {
      message,
      href
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      const message = `Invalid Token`;
      const href = "location.href='/signin'";
      return res.status(401).render('message', {
        message,
        href
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }

    ROLE.find({
        _id: {
          $in: user.roles
        }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({
            message: err
          });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        const message = `This panel requires administrator privileges`
        const href = "window.history.back()";
        res.status(201).render('message', {
          message,
          href
        });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin
};
module.exports = authJwt;