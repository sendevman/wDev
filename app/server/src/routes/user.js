const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const model = require('../models/user');
const helpers = require('../config/helpers');
const { generalError, generalSuccess, busboy } = helpers;

router.post('/login', (req, res, next) => {
    model.login(req.body)
        .then(user => {
            const token = jwt.sign({ _id: user._id });
            generalSuccess(res, 'Auth successful', { token, user });
        })
        .catch(e => generalError(e, res));
});

router.use(jwt.verifyHelper);
router.get('/token', (req, res, next) => {
    model.getByToken(req.body).then(r => generalSuccess(res, "Get logged user", r)).catch(e => generalError(e, res));
});
router.get('/', (req, res, next) => {
    model.getById(req.body).then(r => generalSuccess(res, "Get user by id", r)).catch(e => generalError(e, res));
});
router.post('/create', (req, res) => {
    busboy(merge =>
        model.create(merge)
            .then(user => generalSuccess(res, 'Create User Ok', { user }))
            .catch(e => generalError(e, res))
        , req);
});
router.get('/all', (req, res, next) => {
    model.getAll().then(r => generalSuccess(res, "Get users list", r)).catch(e => generalError(e, res));
});

module.exports = router;