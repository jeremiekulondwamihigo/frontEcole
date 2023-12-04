const mongoose = require("mongoose");
const ModelUser = require("./Users");
const { generateNumber } = require("../Fonctions/Static_Function");

const password = generateNumber(6);

const cours = new mongoose.Schema({
  idEtablissement: {
    type: String,
    required: true,
  },
  idCours: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema(
  {
    agent_save: { type: String, required: true },
    nom: { type: String, required: true },
    postnom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: String, required: false, default: "" },
    nationalite: { type: String, required: false, default: "" },
    matricule: { type: String, required: false, default: "" },
    telephone: { type: String, required: true, unique: true },
    filename: { type: String, required: false },
    code_agent: { type: String, required: true, unique: true },
    etat: { type: String, required: false, default: "" },
    id: { type: String, required: true },
    fonction: { type: String, required: true },
    genre: { type: String, required: true },
    codeDomaine: { type: String, required: true, ref: "DomaineAgent" },
    active: { type: Boolean, required: true, default: true },
    cours: { type: [cours], required: false },
  },
  { toJSON: { virtuals: true } }
);

UserSchema.post("save", function (docs) {
  ModelUser.create({
    username: docs.telephone,
    password: password,
    _id: docs._id,
    fonction: "enseignant",
  }).then((response) => {
    //Envoyer message
  });
});

UserSchema.virtual("fullname").get(function () {
  return this.nom + " " + this.postnom + " " + this.prenom;
});

const User = mongoose.model("Agent", UserSchema);
module.exports = User;
