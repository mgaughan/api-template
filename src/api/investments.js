import { Router } from 'express'
import mongoose from 'mongoose'
// require('../models/investments')

export default ({ config, db }) => {
  let api = Router()
  const schema = new mongoose.Schema({
    name: String,
    address: String,
    classification: String, // TODO MG: number from a enumish?
    location: String,
    funds: Number,
    investmentAmount: Number,
    apr: Number,
    arv: Number,
    loanTerm: Number,
    percentageFunded: Number
  })

  mongoose.model('Investments', schema)

  const Investments = mongoose.model('Investments')

  api.get('/investments', (req, res) => {
    // db.collection('investments').find().toArray((err, result) => {
    //   if (err) throw err

    //   res.json(result)
    // })

    Investments.find({}, (err, docs) => {
      res.json(docs)
    })

  })

  return api
}