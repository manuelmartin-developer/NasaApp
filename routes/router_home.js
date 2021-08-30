const router = require('express').Router();
const home = require('../controllers/home');
const users = require('../controllers/users');
const landings = require('../controllers/landings')
const neas = require('../controllers/neas')
const mars = require('../controllers/mars')
const moon = require('../controllers/moon')

// Home
router.get('', home.home)

// Landings
router.get('/landings', landings.homeLandings)

// NEAs
router.get('/neas', neas.homeNeas)

// Mars
router.get('/mars', mars.home)
// Moon
router.get('/moon:mission?', moon.home)

//Users
router.get('/register', users.register);
router.get('/signin', users.signinPage);
router.get('/logout', users.logout);
router.get('/edit/:afNumber', users.editUser);

module.exports = router;