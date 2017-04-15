import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../models/user'
import config from '../config/app'

// Setup work and export for the JWT passport strategy
module.exports = (passport) => {
  let options = {}

  options.jwtFromRequest = ExtractJwt.fromAuthHeader()
  options.secretOrKey = config.secret

  passport.use(new Strategy(options, (jwtPayload, done) => {
    User.findOne({ id: jwtPayload.id }, (err, user) => {
      if (err) {
        return done(err, false)
      }

      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}