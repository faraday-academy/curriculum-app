import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import treblle from '@treblle/express'

import routes from './api/index.js'
import '../db/index.js'

const app = express()
const port = 5050

// middleware
app.use(treblle())
app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/api/v1', routes)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening on port ${port}!`))
