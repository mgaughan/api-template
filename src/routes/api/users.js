import { Router } from 'express'
import User from '../../models/user'

let usersApi = new Router()

usersApi.use('/', (req, res) => {
  User.find({}, (err, docs) => {
    if (err) {
      return next(err)
    }
    
    res.json(docs)
  })
})

export default usersApi