const router = require('express').Router();
const home = require('../controllers/home');
const users = require('../controllers/users');
const landings = require('../controllers/landings')
const neas = require('../controllers/neas')

// Home
router.get('', home.home)

// Landings
router.get('/landings', landings.getAllLandings)

// NEAs
router.get('/neas', neas.getNeas)

//Users
router.get('/register', users.register);
router.get('/signin', users.signinPage);
router.get('/logout', users.logout);
router.get('/edit/:afNumber', users.editUser);

module.exports = router;