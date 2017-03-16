import { Router } from 'express'
import User from '../models/user'

let registerApi = new Router()

registerApi.use('/', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.json({ success: false, message: 'Please enter email and password.' })
  }

  const user = new User({ 
    email: req.body.email,
    password: req.body.password
  })

  user.save(function(err) {
    if (err) {
      return res.json({ success: false, message: 'That email address already exists.' })
    }
    res.json({ success: true, message: 'Successfully created new user.' })
  })
})

export default registerApi