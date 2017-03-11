import { Router } from 'express'
import register from './register'
import authenticate from './authenticate'
import users from './users'
import investments from './investments'
console.log(register)
console.log(authenticate)
let api = Router();

api.get('/', (req, res) => {

  res.status(200).json({
    message: 'ello'
  })
})
api.post('/register', register)
api.post('/authenticate', authenticate)
api.get('/users', users)
api.get('/investments', investments)

export default api;

