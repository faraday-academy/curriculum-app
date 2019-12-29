const express = require('express')

const routes = require('./api')
require('../db')

const app = express()
const port = 5000

// middleware
app.use(express.json())

app.use('/api/v1', routes)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
