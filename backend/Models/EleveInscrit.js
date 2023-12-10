const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  codeEleve: {
    type: String,
    required: true,
    ref: "eleves",
  },
  codeAnnee: {
    type: String,
    required: true,
  },
  codeClasse: {
    type: String,
    required: true,
    //C'est recommander si le niveau de l'élève est inferieur à 5
    ref: "classes",
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
});



const model = mongoose.model("EleveInscrit", schema);
module.exports = model;
