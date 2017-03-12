import http from 'http'
import express from 'express'
import cors from 'cors'
import config from './config'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import routes from './routes'
import mongoose from 'mongoose'
// import { Promise } from 'es6-promise'

let app = express()

app.server = http.createServer(app)

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({
  limit: config.bodyLimit
}))

// logger
app.use(morgan('dev'))

// mongoose.Promise = Promise
mongoose.connect(config.database)

app.set('superSecret', config.secret)

app.listen(process.env.PORT || config.port)

app.use('/', routes)

export default app