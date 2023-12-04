const mongoose = require("mongoose");

const evenements = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  allDay: { type: Boolean, required: true },
});

const valeur_Annee = new mongoose.Schema({
  annee: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  code_Annee: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    required: true,
  },
  evenement: {
    type: [evenements],
    required: false,
    default: {
      id: new Date(),
      title: "Fête de l'indépendance",
      start: new Date("2024-06-30"),
      end: new Date("2024-07-01"),
      allDay: true,
    },
  },
});

const model = mongoose.model("Annee", valeur_Annee);
module.exports = model;
