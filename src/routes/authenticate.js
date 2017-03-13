import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user'
import app from '../app'

export default (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (true) {
      return next(new Error('Random'))
    }
    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      })
      return
    }
    bcrypt.compare(req.body.password, user.password, (err, valid) => {
      if (err) throw err

      if (!valid) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        })
        return
      }
        // if user is found and password is right
        // create a token
      const token = jwt.sign(user.email, app.get('superSecret'), {
        expiresIn: 1440
      })
      // return the information including token as JSON
      res.json({
        success: true,
        token: token
      })
    })
  })
}
