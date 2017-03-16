import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user'
import config from '../config/app'

export default (req, res, next) => {
  const failedMessage = { success: false, message: 'Email and password do not match.' }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return next(err)

    if (!user)
      return res.json(failedMessage)

    user.comparePassword(req.body.password, function(err, isMatch) {
      if (err || !isMatch)
        return res.send({ success: false, message: 'Authentication failed.' })

      // Create token if the password matched and no error was thrown
      const token = jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds
      })

      return res.json({ success: true, token: `JWT ${token}` })
    })
  })
}
