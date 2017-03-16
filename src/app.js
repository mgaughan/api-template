import http from 'http'
import express from 'express'
import bluebird from 'bluebird'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import mongoose from 'mongoose'
import morgan from 'morgan'
import passport from 'passport'
import config from './config/app'
import routes from './routes'
import errorHandler from './middleware/error-handler'

let app = express()

app.server = http.createServer(app)

mongoose.Promise = bluebird
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

app.use(passport.initialize())

app.listen(process.env.PORT || config.port)

app.use('/', routes)
app.all('*', (res, req, next) => {
  next(new Error(404))
})
app.use(errorHandler)

export default app