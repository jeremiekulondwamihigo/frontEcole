const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  niveau: {
    type: Number,
    min: 1,
    max: 8,
    required: true,
  },
  codeOption: { type: String, required: true, trim: true, ref: 'options' },
  active: { type: Boolean, required: true, default: true },
  codeClasse: { type: String, required: true, unique: true },
  indexe : {  type: String, required:true, default :'A'},
  titulaire : { type:String, required:false}
})
const model = mongoose.model('Classe', schema)
module.exports = model
