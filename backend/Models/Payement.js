const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    montant : {type:Number, required:true, min:0},
    codeTitle : {type:String, required:true},
    codeEleve : { type:String, required:true},
    codeAnnee : {type:String , required:true},
    reste : {type:Number, required:true, min:0}
})
const model = mongoose.model("payement", schema)
module.exports = model;