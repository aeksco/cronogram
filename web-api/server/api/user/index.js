const router = require('express').Router();
const controller = require('./user.controller');
const authorization = require('../middleware/authorization')

// // // //

// GET /users
router.get('/', controller.list);

// POST /users
router.post('/', controller.create);
// GET /users/profile
router.get('/profile', authorization, controller.profile)

// GET /users/:id
router.get('/:id', controller.show);

// PUT /users/:id
router.put('/:id', controller.update);

// DELETE /users/:id
router.delete('/:id', controller.delete);

// GET /users/:id/tasks
router.get('/:id/tasks', controller.showTasks);

// // // //

module.exports = router;
