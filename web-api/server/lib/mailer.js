const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

// // // //

function dispatch ({ text, html, code, json, email, label }) {

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
}

module.exports = {
    dispatch
}
