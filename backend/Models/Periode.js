const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  periode: {
    type: String,
    required: true,
    enum: [
      'premiere',
      'deuxieme',
      'troisieme',
      'quatrieme',
      'examenOne',
      'examenTwo',
    ],
  },
}, {timestamps: true})
const model = mongoose.model("Periode", schema);
module.exports = model;
