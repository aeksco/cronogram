const Queue = require('./queue');
const Task = require('../api/task/task.model');

module.exports = function start() {
    return Task.find({})
    .then((tasks) => {
        tasks.forEach((t) => {
            Queue.add({
                _id: t._id,
                label: t.label,
                script: t.script,
                cron: t.cron,
                // email: t.email
                email: 'aeksco@gmail.com'
            })
        })

        console.log('Queued all tasks')
    })
}
