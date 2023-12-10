const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    option: { type: String, required: [true, 'Ce champs est obligatoire'] },
    codeOption: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    id : {type:String, required : true},
  },
  { timestamps: true },
)

const model = mongoose.model('Option', schema)
module.exports = model
