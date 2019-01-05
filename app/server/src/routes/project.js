const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const model = require('../models/teamwork');
const helpers = require('../config/helpers');
const { generalError, generalSuccess } = helpers;

router.use(jwt.verifyHelper);
router.get('/all', (req, res, next) => {
    model.getProjects().then(r => generalSuccess(res, "Get project list", r)).catch(e => generalError(e, res));
});
router.get('/people', (req, res, next) => {
    model.getPeople().then(r => generalSuccess(res, "Get people list", r)).catch(e => generalError(e, res));
});

module.exports = router;