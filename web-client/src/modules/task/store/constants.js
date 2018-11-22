export const API_ROOT = '/api/tasks'

export const NEW_TASK = {
  label: '',
  dependencies: [],
  cron: '*/30 * * * *',
  description: '',
  script: `module.exports = async function(cronogram) {
  const message = 'Hello, world!'
  return cronogram.done({ text: message });
}`
}

export const EXAMPLES = [
  {
    id: 'hello',
    dependencies: [],
    script: `module.exports = async function(cronogram) {
  const message = 'Hello, world!'
  return cronogram.done({ text: message });
}`
  },
  {
    id: 'request',
    dependencies: [],
    script: `const request = require('request');

// QOTD URL
const qotd_url = 'https://quotes.rest/qod.json'

module.exports = async function(cronogram) {
  request(qotd_url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          const resp = JSON.parse(body);
          const quote = resp.contents.quotes[0]

          // Invokes cronogram.done({ ... }) to dispatch an email with your result
          return cronogram.done({ html: "<h4>" + quote.quote + "</h4><br/><p>" + quote.author + "</p>" });
      }
  })
}`
  },
  {
    id: 'puppeteer',
    dependencies: [],
    script: `const puppeteer = require('puppeteer');

module.exports = async function(cronogram) {

  // Instantiates new headless browser
  const browser = await puppeteer.launch();

  // Destination URL
  const destination = 'http://www.cs.rpi.edu/~milanova/csci4430/homework.htm';

  // Navigates to destination
  const page = await browser.newPage();
  await page.goto(destination, { waitUntil: 'domcontentloaded' });

  // Pulls hrefs
  let hrefs = await page.$$eval('a', as => as.map(a => a.href));

  // Closes the browser
  await browser.close();

  // Invokes cronogram.done({ ... }) to dispatch an email with your result
  return cronogram.done({ code: hrefs.join("\\n") });
}`
  }
]
