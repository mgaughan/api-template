import { Router } from 'express'
import User from '../models/user'

let registerApi = new Router()

registerApi.use('/', (req, res) => {

  User.find({email: req.body.email}, (err, docs) => {
    if (err) {
      console.log(err)
    }

    if (docs.length) {
      res.json({
        success: false,
        errorMessage: 'This email address is already in use.'
      })
      return;
    }
    const user = new User({ 
      email: req.body.email,
      password: req.body.password,
      entitlements: 1
    })
    // save the sample user
    user.save((err) => {
      if (err) {
        res.json({
          success: false,
          errorMessage: 'There was an issue with your registration.'
        })
      }

      res.json({
        success: true 
      })
    })
  })
})

export default registerApi