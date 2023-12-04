const mongoose = require("mongoose");
const ModelInfo = require("./Eleves");

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  code_eleve: {
    type: String,
    required: true,
    ref: "eleves",
  },
  codeEtablissement: {
    type: String,
    required: true,
    ref: "etablissements",
  },
  code_Annee: {
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
  codeInscription: {
    type: String,
    required: true,
  },
  cotation: {
    type: mongoose.Types.ObjectId,
    ref: "Cotation",
  },
  ref: {
    type: String,
    required: true,
    unique: true,
  },
});

schema.post("save", function (docs, next) {
  next();
  ModelInfo.findByIdAndUpdate(
    {
      code_eleve: docs.code_eleve,
    },
    {
      $set: {
        libre: false,
      },
    }
  );
});

const model = mongoose.model("EleveInscrit", schema);
module.exports = model;
