const cron = require('node-cron');
const { run } = require('./vm');
const Mailer = require('./mailer');

// Global queue in-memory - definitely fix later
const queue = {}

function add(task) {

    console.log('QUEUE.ADD')
    // console.log(task)
    // console.log(queue)

    // Removes and re-adds
    remove(task)

    const cronTask = cron.schedule(task.cron, () =>  {

      console.log('RUNNING ' + task.label)

      // Defines cronogram helper functions
      const cronogram = {
          done ({ text, html, code, json }) {

              // Assembles response
              const dispatch = {
                from: 'Cronogram <worker@cronogram.com>',
                subject: 'Cronogram Task: ' + task.label,
                email: task.email,
                label: task.label,
                text: text,
                html: html,
                json: json
              };

              // Send mailgun dispatch
              Mailer.dispatch(dispatch)
          }
      }

      // Runs the script and passes in the `done` callback
      run({ script: task.script, cronogram: cronogram })

    });

    // Adds to queue
    queue[task._id] = cronTask;

}

function remove(task) {
    const cronTask = queue[task._id]
    if (cronTask) {
        cronTask.destroy();
        delete queue[task._id]
    }
}

module.exports = {
    remove,
    add
}
