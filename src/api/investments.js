import { Router } from 'express'
import Investment from '../models/investment'

let investmentsApi = new Router()

investmentsApi.use('/', (req, res) => {
    Investment.find({}, (err, docs) => {
      res.json(docs)
    })
})

investmentsApi.use('/new', (req, res) => {
    const investment = new Investment({
      name: 'something'
    })
    investment.save((err) => {
      if (err) throw err;

      console.log('User saved successfully')
      res.json({ success: true })
    })
})

export default investmentsApi