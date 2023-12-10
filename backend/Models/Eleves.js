const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  codeEleve: {
    type: String,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  postnom: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  prenom: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  contactTuteur: {
    type: String,
    required: false,
    default: '',
  },
  date_naissance: {
    type: String,
    required: false,
    default: '',
  },
  lieu_naissance: {
    type: String,
    required: false,
    trim: true,
    uppercase: true,
  },
  genre: {
    type: String,
    required: true,
    enum: ['M', 'F'],
  },
  filename: {
    type: String,
    required: false,
    default: '',
  },
  nationalite: {
    type: String,
    required: false,
    trim: true,
    uppercase: true,
  },
  nomPere: {
    type: String,
    required: false,
    trim: true,
    uppercase: true,
  },
  professionPere: {
    type: String,
    required: false,
    trim: true,
    uppercase: true,
  },
  nomMere: {
    type: String,
    required: false,
    trim: true,
    uppercase: true,
  },
  professionMere: {
    type: String,
    required: false,
    trim: true,
    uppercase: true,
  },
}, { timestamps : true, toJSON : { virtuals : true}})


schema.virtual("fullname").get(function(){
  return this.nom+' '+this.postnom+' '+this.prenom
})

const model = mongoose.model('Eleve', schema)
module.exports = model
