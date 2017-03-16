// var JwtStrategy = require('passport-jwt').Strategy;  
// var ExtractJwt = require('passport-jwt').ExtractJwt;  
// var User = require('../app/models/user');  
// var config = require('./app');

import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../models/user'
import config from '../config/app'

// Setup work and export for the JWT passport strategy
module.exports = (passport) => {  
  let options = {}

  options.jwtFromRequest = ExtractJwt.fromAuthHeader()
  options.secretOrKey = config.secret

  passport.use(new Strategy(options, (jwt_payload, done) => {
    User.findOne({ id: jwt_payload.id }, (err, user) => {
      if (err)
        return done(err, false)
      
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}