import { Router } from 'express'
import User from '../../models/user'

let usersApi = new Router()

usersApi.use('/', (req, res) => {
    User.find({}, (err, docs) => {
      res.json(docs)
    })
})

export default usersApi