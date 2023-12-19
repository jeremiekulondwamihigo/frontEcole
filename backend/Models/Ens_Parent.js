const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    nom: { type: String, required: true, uppercase: true },
    telephone: { type: String, required: true },
    eleveListe: { type: Array, required: false },
    active: { type: Boolean, required: false, default: true },
    status: { type: String, required: true, enum: ['enseignant', 'parent'] },
    niveau :{type:String, required:false },
    domaine :{type:String, required:false },
    fonction :{type:String, required:false },
  },
  { timestamps: true },
)
const model = mongoose.model('parent', schema)
module.exports = model
