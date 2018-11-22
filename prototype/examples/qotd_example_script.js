const request = require('request');

// QOTD URL
const qotd_url = 'https://quotes.rest/qod.json'

module.exports = async function(cronogram) {
  request(qotd_url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          const resp = JSON.parse(body);
          const quote = resp.contents.quotes[0]
          return cronogram.done({ html: `<h4>${quote.quote}</h4><br/><p>${quote.author}</p>` });
      }
  })
}
