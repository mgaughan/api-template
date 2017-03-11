import { Router } from 'express'
import { Promise } from 'es6-promise'
import User from '../models/user'

let registerApi = new Router()

registerApi.use('/', (req, res) => {
  const userWithUserName = User.findOne({username: req.body.username})
  const userWithEmail = User.findOne({email: req.body.email})

  userWithUserName
    .then(doc => {
      console.log('username', doc)
      if (doc !== null) {
        res.json({
          success: false,
          errorMessage: 'This username is already in use.'
        })
        return
      }

      userWithEmail
        .then((err, docs) => {
          console.log('email', docs)
          if (!docs.length) {
            res.json({
              success: false,
              errorMessage: 'This email address is already in use.'
            })
          }

          const user = new User({ 
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            entitlements: 1
          })
          // save the sample user
          user.save((err) => {
            if (err) throw err;

            res.json({
              success: true 
            })
          })
        })
      })

    // .catch(err => {
    //   res.json({
    //     success: false,
    //     errorMessage: 'There was an error with registration.'
    //   })
    // })
})

export default registerApi