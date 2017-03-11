import User from '../models/user'
import app from '../app'
import jwt from 'jsonwebtoken'

export default (req, res) => {
    User.findOne({
      username: req.body.username
    }, (err, user) => {
      if (err) throw err
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        })
      } else if (user) {
        // check if password matches
        if (user.password !== req.body.password) {
          res.json({
            success: false, 
            message: 'Authentication failed. Wrong password.'
          })
        } else {
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: 1440
          })

          // return the information including token as JSON
          res.json({
            success: true,
            token: token
          })
        }
      }
    }
  )
}
