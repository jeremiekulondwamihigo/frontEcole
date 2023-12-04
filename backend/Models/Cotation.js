const mongoose = require("mongoose");
const modelEleve = require("./EleveInscrit");
const ModelCours = require("./Cours");
const asyncLab = require("async");
const { ApreModification } = require("../Controllers/ApreModification");

//Cotations
const cote = new mongoose.Schema({
  cote: { type: Number, required: true, default: 0 },
  enseignant: { type: mongoose.Types.ObjectId, required: false, ref: "agents" },
  etablissement: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "etablissements",
  },
});

//Model cotation
const modelCotation = new mongoose.Schema({
  idCours: { type: String, required: true },
  premiere: { type: cote, default: { cote: 0 } },
  deuxieme: { type: cote, default: { cote: 0 } },
  examenOne: { type: cote, default: { cote: 0 } },
  troisieme: { type: cote, default: { cote: 0 } },
  quatrieme: { type: cote, default: { cote: 0 } },
  examenTwo: { type: cote, default: { cote: 0 } },
});

//Place
const modelPlace = new mongoose.Schema({
  premiere: { type: String, required: false },
  deuxieme: { type: String, required: false },
  finPremiere: { type: String, required: false },
  troisieme: { type: String, required: false },
  quatrieme: { type: String, required: false },
  finDeuxieme: { type: String, required: false },
});

//Application et conduite
const modelApplicationConduite = new mongoose.Schema({
  premiere: { type: String, required: false },
  deuxieme: { type: String, required: false },
  troisieme: { type: String, required: false },
  quatrieme: { type: String, required: false },
});

const model = new mongoose.Schema(
  {
    code: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    cotation: {
      type: [modelCotation],
      required: false,
      default: [],
    },
    application: {
      type: modelApplicationConduite,
      required: false,
    },
    conduite: {
      type: modelApplicationConduite,
      required: false,
    },
    place: {
      type: modelPlace,
      required: false,
    },
  },
  { timestamps: true }
);

model.post("findOneAndUpdate", function (doc, next) {
  next();
  ApreModification(doc);
  
});
const schema = mongoose.model("Cotation", model);
module.exports = schema;
