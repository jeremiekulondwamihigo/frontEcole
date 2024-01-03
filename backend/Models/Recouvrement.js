const mongoose = require('mongoose')

const recouvrement = new mongoose.Schema({
  codeTitle: { type: String, required: true },
  pourcentage: { type: Number, required: true },
  active : { type:Boolean, required:true, default : true}
})
const model = mongoose.model('Recouvrement', recouvrement)
module.exports = model
