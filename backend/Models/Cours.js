const mongoose = require('mongoose')

const schemaCours = new mongoose.Schema({
  id: { type: String, required: true },
  branche: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  maxima: {
    type: Number,
    required: true,
    trim: true,
  },
  codeClasse: {
    type: String,
    required: true,
  },
  idCours: { type: String, required: true, unique: true },
  validExamen: {
    type: Boolean,
    required: true,
    default: true,
  },
  idEnseignant : {type:String, required:false},
  identifiant: { type: String, required: false, default: undefined }, //code domaine ou sous-domaine si option = education de base
})
let valeur = mongoose.model('Cours', schemaCours)
module.exports = valeur
