console.log(`Node environment: ${process.env.NODE_ENV}`)
if (process.env.NODE_ENV === 'production') {
  // this will be setup for different environments:
  require('dotenv').config()
} else {
  require('dotenv').config()
}

require('module-alias/register')

require('./server')
