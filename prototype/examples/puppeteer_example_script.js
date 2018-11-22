const puppeteer = require('puppeteer');

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

  // Returns the inner text
  return cronogram.done({ code: hrefs.join("\n") });
}
