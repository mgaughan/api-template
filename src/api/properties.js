import { Router } from 'express'

export default ({ config, db }) => {
  let api = Router()

  api.get('/properties', (req, res) => {
    db.collection('properties').find().toArray((err, result) => {
      if (err) throw err

      res.json(result)
    })
  })

  return api
}