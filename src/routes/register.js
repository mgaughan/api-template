import { Router } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'

let registerApi = new Router()

registerApi.use('/', (req, res) => {

  User.find({email: req.body.email}, (err, docs) => {
    const errorRes = {
      success: false,
      errorMessage: 'There was an issue with your registration.'
    }

    if (err) {
      res.json(errorRes)
      return;
    }

    if (docs.length) {
      res.json({
        success: false,
        errorMessage: 'This email address is already in use.'
      })
      return;
    }
 
    const password = req.body.password
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, salt) => {
      if (err) {
        res.json(errorRes)
        return
      }
      const user = new User({ 
        email: req.body.email,
        password: salt,
        entitlements: 1
      })

      user.save((err) => {
        if (err) {
          res.json(errorRes)
          return
        }

        res.json({
          success: true 
        })
      })
    })
  })
})

export default registerApi