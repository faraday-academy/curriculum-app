var api_key = process.env.MAILGUN_KEY
var domain = 'sandbox38b0d1a399844fae8659ba637921ae85.mailgun.org'
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
 
async function sendEmail(payload) {
  const { code } = payload
  var data = {
    from: 'Excited User <gwenfaraday@pm.me>',
    to: 'gwenfaraday@pm.me',
    subject: `Curricula App Verification Code: ${code}`,
    text: `Enter this code: ${code}`
  }

  await mailgun.messages().send(data)
  console.log('message sent')
  return true
}

module.exports = { sendEmail }
