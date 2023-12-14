const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  etablissement: {
    type: String,
    required: true,
  },
  codeEtablissement: {
    type: String,
    required: true,
    minlength: 7,
    unique: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
    enum: [true, false],
  },

  code_option: { type: Array, required: false, default: ["Education de Base"] },
  periode: {
    type: String,
    required: true,
    trim:true,
    enum: [
      "premiere",
      "deuxieme",
      "examenOne",
      "troisieme",
      "quatrieme",
      "examenTwo",
    ],
    default:"premiere"
  },
});

const model = mongoose.model("Etablissement", schema);
module.exports = model;
