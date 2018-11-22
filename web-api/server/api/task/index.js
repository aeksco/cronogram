const router = require('express').Router();
const controller = require('./task.controller');
const authorization = require('../middleware/authorization')

// // // //

// GET /tasks
router.get('/', controller.list);

// POST /tasks
router.post('/', authorization, controller.create);

// POST /tasks/test
router.post('/test', authorization, controller.test);

// GET /tasks/:id
router.get('/:id', authorization, controller.show);

// PUT /tasks/:id
router.put('/:id', authorization, controller.update);

// DELETE /tasks/:id
router.delete('/:id', authorization, controller.delete);

// GET /tasks/:id/user
router.get('/:id/user', authorization, controller.showUser);

// // // //

module.exports = router;
