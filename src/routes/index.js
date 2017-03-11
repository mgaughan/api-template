import { Router } from 'express'
import requireToken from '../middleware/require-token'
import authenticate from './authenticate'
import register from './register'
import users from './api/users'
import investments from './api/investments'

let route = Router()

route.post('/authenticate', authenticate)
route.post('/register', register)
route.use('/api', requireToken)
route.get('/api/users', users)
route.get('/api/investments', investments)

export default route