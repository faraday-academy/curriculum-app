console.log(`Node environment: ${process.env.NODE_ENV}`)
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '/root/devops/.env' })
} else {
  require('dotenv').config()
}

require('module-alias/register')

require('./server')
