const router = require('express').Router();

router.use('/access', require('./access'));

module.exports = router;