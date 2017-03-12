import mongoose from 'mongoose'
// TODO MG: use swagger
const schema = new mongoose.Schema({
  email: String,
  password: String,
  entitlements: Number // enum?
})

export default mongoose.model('User', schema)