const boom = require('boom')
const Task = require('./task.model')
const User = require('../user/user.model')
const Mailer = require('../../lib/mailer')
const Queue = require('../../lib/queue')
const { run } = require('../../lib/vm')

// // // //


// GET /api/tasks/:id Index
module.exports.list = (req, res, next) => {
    return Task.find({})
    .populate({ path: 'user', select: 'username' })
    .then((response) => {
        return res
        .status(200)
        .json(response);
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// POST /api/tasks/:id Create
module.exports.create = (req, res, next) => {
    return new Task(req.body).save()
    .then((response) => {
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// GET /api/tasks/:id Show
module.exports.show = (req, res, next) => {
    return Task.findById(req.params.id)
    .populate({ path: 'user', select: 'username' })
    .then((response) => {
        return res
        .status(200)
        .send(response)
        // .send(response.toJSON({ getters: true, virtuals: true }))
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// GET /api/tasks/:id/user showUser
module.exports.showUser = (req, res, next) => {
    return Task.findById(req.params.id)
    .then((task) => {

        return User.findById(task.user_id)
        .then((user) => {
            return res
            .status(200)
            .send(user)
            .end();
        })
        .catch( err => next(boom.badImplementation(err)) );

    })
    .catch( err => next(boom.badImplementation(err)) );
};


// PUT /api/tasks/:id Update
module.exports.update = (req, res, next) => {
    return Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((response) => {
        console.log('RESP')
        console.log(response)
        const queueTask = {
            _id: response._id,
            cron: response.cron,
            label: response.label,
            script: response.script,
            email: req.user.email
        }
        Queue.add(queueTask)
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};

// POST /api/tasks/test Test
module.exports.test = (req, res, next) => {

    // Defines cronogram helper functions
    const cronogram = {
        done ({ text, html, code, json }) {

            // Sets label
            const label = req.body.label

            // Assembles response
            const dispatch = {
              from: 'Cronogram <worker@cronogram.com>',
              subject: 'Cronogram Task: ' + label,
              label: label
            };

            // Formats email output
            if (text) {
              dispatch.text = text
            } else if (html) {
              dispatch.html = `<h1>Cronogram</h1><p>Here is the output for your Cronogram task "${label}"</p><hr/>${html}<hr/><p>Thank you for using Cronogram :)</p>`
            } else if (code) {
              dispatch.html = `<h1>Cronogram</h1><p>Here is the output for your Cronogram task "${label}"</p><pre>${code}<pre/><p>Thank you for using Cronogram :)</p>`
            } else if (json) {
              dispatch.html = `<h1>Cronogram</h1><p>Here is the output for your Cronogram task "${label}"</p><pre>${JSON.stringify(json, null, 2)}<pre/><p>Thank you for using Cronogram :)</p>`
            }

            // Sends email
            if (req.body.email && req.user) {

                // Assigns current user email
                dispatch.email = req.user.email

                // Send mailgun dispatch
                Mailer.dispatch(dispatch)

            }

            // Sends response to the client
            res.json(dispatch);
        }
    }

    // Runs the script and passes in the `done` callback
    run({ script: req.body.script, cronogram: cronogram })
    // .catch( err => next(boom.badImplementation(err)) );
};


// DELETE /api/tasks/:id Destroy
module.exports.delete = (req, res, next) => {
    return Task.remove({ _id: req.params.id })
    .then((response) => {
        Queue.remove(req.params.id)
        return res
        .status(200)
        .send(response)
        .end();
    })
    .catch( err => next(boom.badImplementation(err)) );
};
