require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'aeksco@gmail.com',
  from: 'aeksco@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);