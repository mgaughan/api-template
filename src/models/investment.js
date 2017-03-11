import mongoose from 'mongoose'
// TODO MG: use swagger
const schema = new mongoose.Schema({
  name: String,
  address: String,
  classification: String, // TODO MG: number from a enumish?
  location: String,
  funds: Number,
  investmentAmount: Number,
  apr: Number,
  arv: Number,
  loanTerm: Number,
  percentageFunded: Number
})
// TODO MG: not working with require
mongoose.model('Investment', schema)