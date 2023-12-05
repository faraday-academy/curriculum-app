if (process.env.NODE_ENV !== 'local') {
  var api_key = process.env.MAILGUN_KEY
  var domain = 'mg.studytracker.tech'
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
}

async function sendEmail(payload) {
  /*
  For local development, logs email info to
  the console.
  Otherwise, sends email through mailgun.
  */
  // TODO: make this a general purpose function and
  // not tied to only verification emails.

  const { code, email } = payload
  var data = {
    from: 'Admin <contact@studytracker.tech>',
    to: email,
    subject: `Curricula App Verification Code: ${code}`,
    text: `Enter this code: ${code}`
  }

  if (process.env.NODE_ENV === 'local') {
    console.log('**Console email information**')
    console.log(JSON.stringify(data, null, 4))
  } else {
    await mailgun.messages().send(data)
  }
  console.log('message sent')
  return true
}

module.exports = { sendEmail }
