import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import middleware from './middleware'
import api from './api/investments' // TODO MG: use index file and import api modules
import config from './config.json'
import mogoose from 'mongoose'
import path from 'path'
import fs from 'fs'

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

// connect to db
mogoose.connect('mongodb://localhost:27017/crowdnine', (err) => {
  if (err) {
    console.log(err)
  }
})

app.server.listen(process.env.PORT || config.port)

console.log(`Started on port ${app.server.address().port}`)

app.use('/', api({ config }))

export default app