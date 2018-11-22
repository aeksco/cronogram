require('dotenv').config();
var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

// Build email
var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'aeksco@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};

// Send mailgun email
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});