import { Router } from 'express'
import passport from 'passport'
import passportStrategy from '../config/passport'
import authenticate from './authenticate'
import register from './register'
import users from './api/users'
import investments from './api/investments'

let route = Router()

passportStrategy(passport)

route.post('/authenticate', authenticate)
route.post('/register', register)
route.use('/api', passport.authenticate('jwt', { session: false }))
route.get('/api/users', users)
route.get('/api/investments', investments)

export default route