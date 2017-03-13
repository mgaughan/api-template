import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import mongoose from 'mongoose'
import config from './config'
import routes from './routes'
import * as errorHandlers from './middleware/error-handler'
// import { Promise } from 'es6-promise'

let app = express()

app.server = http.createServer(app)
mongoose.connect(config.database)

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({
  limit: config.bodyLimit
}))
app.use(compression())

// logger
app.use(morgan('dev'))

// mongoose.Promise = Promise

app.listen(process.env.PORT || config.port)

app.use('/', routes)
app.all('*', (res, req, next) => {
  next(new Error('404'))
})
app.use(errorHandlers.logErrors)
app.use(errorHandlers.clientErrorHandler)
app.use(errorHandlers.errorHandler)

export default app