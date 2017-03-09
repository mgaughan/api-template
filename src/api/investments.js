import { Router } from 'express'

export default ({ config, db }) => {
  let api = Router()

  api.get('/investments', (req, res) => {
    db.collection('investments').find().toArray((err, result) => {
      if (err) throw err

      res.json(result)
    })
  })

  return api
}