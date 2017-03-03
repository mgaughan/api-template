import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import middleware from './middleware'
import api from './api/properties'
import config from './config.json'
import mongodb from 'mongodb'

const path = require('path')
let app = express()

app.server = http.createServer(app)

// logger
app.use(morgan('dev'))

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.json({
  limit: config.bodyLimit
}))

// app.use('/assets', express.static(`${__dirname}/assets`))

// connect to db
mongodb.MongoClient.connect('mongodb://localhost:27017/crowdnine', (err, db) => {
  // internal middleware
  app.use(middleware({ config, db }))

  // app.get('/', (req, res) => {
  //   res.sendFile(`${__dirname}/index.html`)
  // })
  // api router
  app.use('/', api({ config, db }))

  app.server.listen(process.env.PORT || config.port)

  console.log(`Started on port ${app.server.address().port}`)
})

export default app