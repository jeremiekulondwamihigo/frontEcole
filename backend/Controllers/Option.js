const { generateString } = require('../Fonctions/Static_Function')
const modelOption = require('../Models/Option')
const asyncLab = require('async')

module.exports = {
  addOption: (req, res) => {
    try {
      const { option } = req.body
      if (!option) {
        return res.status(404).json("Veuillez entrer l'option")
      }

      asyncLab.waterfall(
        [
          function (done) {
            modelOption
              .findOne({ option })
              .then((response) => {
                if (response) {
                  return res.status(404).json('Cette option existe deja')
                } else {
                  done(null, true)
                }
              })
              .catch(function (err) {
                console.log(err)
              })
          },
          function (response, done) {
            modelOption
              .create({ option, codeOption: generateString(8), id : new Date() })
              .then((options) => {
                done(options)
              })
              .catch(function (err) {
                console.log(err)
              })
          },
        ],
        function (result) {
          if (result) {
            return res.status(200).json(result)
          } else {
            return res.status(404).json("Erreur d'enregistrement")
          }
        },
      )
    } catch (error) {
      console.log(error)
    }
  },
  readOption: (req, res) => {
    try {
      modelOption
        .find({})
        .then((options) => {
          return res.status(200).json(options.reverse())
        })
        .catch(function (err) {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }
  },
  updateOption: (req, res) => {
    try {
      const { id, data } = req.body
      console.log(req.body)
      modelOption
        .findByIdAndUpdate(id, data , { new: true })
        .then((options) => {
          return res.status(200).json(options)
        })
        .catch(function (err) {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }
  },
}
