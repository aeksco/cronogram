require('dotenv').config();
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const morgan = require('morgan');
const express = require('express');
const ObjectId = require('bson-objectid');
const bodyParser = require('body-parser');
const { NodeVM, VMScript } = require('vm2')

const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

// // // //

// Configures SendGrid

// Express.js App & Configuration
const app = express();

// Print the request log on console
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static client assets
app.use(express.static('client'));

// Serve client HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
})

// // // //

async function handleRequest(req, res) {

  // Pulls build from req.body
  const {
    label,
    script,
    email
  } = req.body

  if (!email || !label || !script) { return res.status(400).json({ error: 'Missing required fields: email, label, script' }) }

  // const vmScript = "module.exports = async function(cronogramDone) {\n" + script + "\n}"
  const vmScript = script

  const vm = new NodeVM({
      require: {
          external: true
      },
      console: 'inherit'
  });

  try {

      // Runs the script
      sandboxCallback = vm.run(vmScript, 'vm.js')

      // Handles async
      sandboxCallback(({ text, html, code, json }) => {

        // Sends result of the run back to the end-user
        res.json({ queued: true });

        // Returns if no email address supplied
        if (!email) { return; }

        // Build email
        const dispatch = {
          from: 'Cronogram <worker@cronogram.com>',
          to: email,
          subject: 'Cronogram Task: ' + label,
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
        } else {
          return
        }

        // Send mailgun dispatch
        mailgun.messages()
        .send(dispatch, function (error, body) {
          // console.log(dispatch);
          console.log(`Sent ${dispatch.label} to ${email} via MailGun`);
        });

      });

  } catch (err) {
      console.error('Failed to compile script.', err);
  }

}

// // // //

// POST /api/jobs
// Accepts:
// {
//   script: script,
//   label: label,
//   email: '',
//   cron: ''
// }
app.post('/api/jobs', handleRequest)

// Jobs API
// GET /api/jobs
// POST /api/jobs
// GET /api/jobs/:id
// PUT /api/jobs/:id
// POST /api/jobs/:id/test
// DELETE /api/jobs/:id

// Examples API
// GET /api/examples (constants)

// // // //

// Port configuration (move to bottom, not needed with serverless)
const port = process.env.PORT || 3000;

// Starts Express app
app.listen(port, () => {
  console.log(`Express is running on port ${port}`)
})
