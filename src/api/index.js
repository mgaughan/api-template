import { Router } from 'express'

export default ({ config, db }) => {
  let api = Router()

  api.get('/', (req, res) => {
    res.json({test: 'hey'})
  })

  return api
}