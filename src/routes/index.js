const express = require('express');
const router = express.Router();
const auth = require('./session');
const users = require('./users');

router.use('/session', auth);
router.use('/users', users);


module.exports = router;