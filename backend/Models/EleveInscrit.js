const mongoose = require('mongoose')

const derogatn = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    codeAgent: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
)
const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  codeEleve: {
    type: String,
    required: true,
    ref: 'eleves',
  },
  codeAnnee: {
    type: String,
    required: true,
  },
  codeClasse: {
    type: String,
    required: true,
    //C'est recommander si le niveau de l'élève est inferieur à 5
    ref: 'classes',
  },
  resultat: {
    type: Number,
    required: true,
    default: 0,
  },
  ref: {
    type: String,
    required: true,
    unique: true,
  },
  derogation: {
    type: derogatn,
    required: false,
  },
})

const model = mongoose.model('EleveInscrit', schema)
module.exports = model
