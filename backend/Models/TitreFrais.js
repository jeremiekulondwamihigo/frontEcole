const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title : {type:String, required:true, trim:true},
    debut : {type:Date, required:true},
    fin : {type:Date, required:true},
    codeAnnee : {type:String, required:true},
    codeTitle : {type:String, required:true}
})
const model = mongoose.model("TitreFrai", schema)
module.exports = model