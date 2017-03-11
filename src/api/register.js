import { Router } from 'express'
import User from '../models/user'

let registerApi = new Router()

registerApi.use('/', (req, res) => {
  var mike = new User({ 
    name: 'Mike Gaughan',
    email: 'michael.t.gaughan@gmail.com',
    password: 'quantex',
    entitlements: 1
  })
  // save the sample user
  mike.save((err) => {
    if (err) throw err;

    console.log('User saved successfully')
    res.json({ success: true })
  })
})

export default registerApi