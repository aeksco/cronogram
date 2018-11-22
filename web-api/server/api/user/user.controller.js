const boom = require('boom')
const User = require('./user.model')
const Task = require('../task/task.model')

// // // //

// GET /api/users Profile
exports.profile = (req, res) => {
    return User.findOne({ username: req.user.username }, '-password -__v').exec()
    .then( (user) => { res.json(user) })
}

// GET /api/users/:id Index
module.exports.list = (req, res, next) => {
    return User.find({})
    .then((response) => {
        return res
        .status(200)
        .json(response);
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// POST /api/users/:id Create
module.exports.create = (req, res, next) => {
    return User.create(req.body)
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// GET /api/users/:id Show
module.exports.show = (req, res, next) => {
    return User.findById(req.params.id)
    // .populate({ path: 'tasks', select: 'label' })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        // .send(response.toJSON({ getters: true, virtuals: true }))
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// GET /api/users/:id/tasks showTasks
module.exports.showTasks = (req, res, next) => {
    return Task
    .find({ user_id: req.params.id })
    .populate({ path: 'user', select: 'username' })
    .then((tasks) => {
        return res
        .status(200)
        .send(tasks)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// PUT /api/users/:id Update
module.exports.update = (req, res, next) => {
    return User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// DELETE /api/users/:id Destroy
module.exports.delete = (req, res, next) => {
    return User.remove({ _id: req.params.id })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};
