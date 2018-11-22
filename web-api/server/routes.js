const router = require('express').Router()

// // // //

// Bootstrap API module routers
router.use('/auth', require('./api/auth'))
router.use('/users', require('./api/user'))
router.use('/tasks', require('./api/task'))

// // // //

module.exports = router
