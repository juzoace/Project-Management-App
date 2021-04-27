const router = require('express').Router();

router.use('/access', require('./access'));
router.use('/project', require('./project'))
module.exports = router;