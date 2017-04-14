import { Router } from 'express'
import Investment from '../../models/investment'

let investmentsApi = new Router()

investmentsApi.use('/', (req, res) => {
  Investment.find({}, (err, docs) => {
    if (err) {
      return next(err)
    }
    res.json(docs)
  })
})

export default investmentsApi