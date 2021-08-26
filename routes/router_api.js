const router = require('express').Router();
const landings = require('../controllers/landings');
const neas = require('../controllers/neas');
const users = require('../controllers/users');
const {
    verifyToken,
    isAdmin
} = require('../middlewares/authJwt');
const {
    checkDuplicateNameOrNickname,
    checkRolesExisted
} = require('../middlewares/verifySignUp');
const {
    checkNicknameAndPassword
} = require('../middlewares/verifySignIn');

// Landings
router.get('/astronomy/landings:minimum_mass?:from?:to?', landings.getAllLandings);
router.get('/astronomy/landings/mass/:mass', landings.getOneLandingMass);
router.get('/astronomy/landings/class/:class', landings.getAllLandingClass);

// NEAs
router.get('/astronomy/neas:class?:from?:to?', neas.getNeas);

// Users
router.post('/astronomy/guild', checkDuplicateNameOrNickname, checkRolesExisted, users.signUp);
router.post('/astronomy/guild/signin', checkNicknameAndPassword, users.signin);
router.put('/astronomy/guild/:afNumber', verifyToken, users.updateUser);
router.put('/astronomy/guild/:afNumber/delete', verifyToken, users.updateDeletedUser);

// Admin
router.post('/auth/dashboard', verifyToken, isAdmin, users.admindashboard);
router.post('/astronomy/guild/details', verifyToken, isAdmin, users.getUserDetails);
router.post('/astronomy/guild/users', verifyToken, isAdmin, users.users);
router.post('/astronomy/guild/search', verifyToken, isAdmin, users.search);
router.delete('/astronomy/guild/:afNumber', verifyToken, isAdmin, users.deleteUser);


module.exports = router;