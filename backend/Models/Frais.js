const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    codeClasse : { type:String, required:true},
    codeTitle : { type:String, required:true},
    montant : {type:Number, required:true}
})
const model = mongoose.model("Frai", schema);
module.exports = model