require('module-alias/register')
require('dotenv').config()
const path = require("path");
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const treblle = require('@treblle/express')

const routes = require('./api')
require('../db')

const app = express()
const port = 5050

// middleware
app.use(treblle())
app.use(morgan('dev'))
app.use(express.json())

if (process.env.NODE_ENV === "production"){
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../../curriculum-front/dist")));
}
app.use(helmet())
app.use(cors())

app.use('/api/v1', routes)

if (process.env.NODE_ENV === "production"){
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../../curriculum-front/dist", "index.html"));
  });
}
else{
  app.get('/', (req, res) => res.send('Hello World!'))
}


app.listen(port, () => console.log(`App listening on port ${port}!`))
