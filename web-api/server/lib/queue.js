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

              // Sets label
              const label = task.label

              // Assembles response
              const dispatch = {
                from: 'Cronogram <worker@cronogram.com>',
                subject: 'Cronogram Task: ' + task.label,
                email: task.email,
                label: label
              };

              // Formats email output
              if (text) {
                dispatch.text = text
              } else if (html) {
                dispatch.html = `<h1>Cronogram</h1><p>Here is the output for your Cronogram task "${task.label}"</p><hr/>${html}<hr/><p>Thank you for using Cronogram :)</p>`
              } else if (code) {
                dispatch.html = `<h1>Cronogram</h1><p>Here is the output for your Cronogram task "${task.label}"</p><pre>${code}<pre/><p>Thank you for using Cronogram :)</p>`
              } else if (json) {
                dispatch.html = `<h1>Cronogram</h1><p>Here is the output for your Cronogram task "${task.label}"</p><pre>${JSON.stringify(json, null, 2)}<pre/><p>Thank you for using Cronogram :)</p>`
              }


              // Send mailgun dispatch
              Mailer.dispatch(dispatch)
          }
      }

      // Runs the script and passes in the `done` callback
      run({ script: task.script, cronogram: cronogram })

    });

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
