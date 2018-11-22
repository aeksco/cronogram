#!/usr/bin/env node
const puppeteer = require('puppeteer');
const HEADLESS = true // NOTE - change to `false` for dubugging

// Options for Puppeteer headless browser
const PUPPETEER_OPTIONS = {
  headless: HEADLESS,
  slowMo: 5,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--enable-logging',
    '--v=1'
  ]
}

module.exports = async function(cronogram) {

  // Instantiates new headless browser
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS);

  // Destination URL
  const destination = 'http://www.cs.rpi.edu/~milanova/csci4430/homework.htm'

  // Navigates to destination
  const page = await browser.newPage();
  // await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: './' })
  await page.goto(destination, { waitUntil: 'domcontentloaded' });

  // Submitting form
  // await page.waitFor('input[name=q]')
  // await page.$eval('a', (el, value) => el.value = value, query);
  // await page.click('input[name=commit]');

  // Waiting for next page load
  // await page.waitFor('button.select-result[type=submit]');
  // await page.click('button.select-result[type=submit]');

  // Clicking "Final Step" button
  // await page.waitFor('[alt="continue to final step"]');
  // await page.click('[alt="continue to final step"]');

  // Clicking "Create Citation" button
  // await page.waitFor('#create_citation');
  // await page.click('#create_citation');

  // Waits for the DOM element that wraps the good stuff
  // await page.waitFor('.bibliography-item-copy-text');

  // Isolates the element with the citation's text content
  // and pulls the citation text out of it
  // const element = await page.$('.bibliography-item.most-recent')
  // const citationText = await element.$eval('.bibliography-item-copy-text', node => node.innerText);

  // Pulls hrefs
  let hrefs = await page.$$eval('a', as => as.map(a => a.href));

  // Closes the browser
  await browser.close();

  // Returns the inner text
  // return citationText
  return cronogram.done({ text: 'Ran puppeteer well!' })
}

  // const browser = await puppeteer.launch()
  // const page = await browser.newPage('http://www.cs.rpi.edu/~milanova/csci4430/homework.htm')

  // const navigationPromise = page.waitForNavigation()


  // await browser.close()

  // // const request = require('request');

  // // request('http://www.cs.rpi.edu/~milanova/csci4430/homework.htm', (error, response, body) => {
  // //     if (!error && response.statusCode == 200) {
  // //         // cronogramDone({ html: body });
  // //         cronogramDone({ code: "No new homework assignments yet for CSCI" });
  // //     }
  // // })