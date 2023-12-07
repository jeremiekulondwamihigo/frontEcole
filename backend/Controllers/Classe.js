const { generateString } = require('../Fonctions/Static_Function')
const modelClasse = require('../Models/Classe')
const modelOption = require('../Models/Option')
const asyncLab = require('async')

module.exports = {
  AddClasse: (req, res) => {
    try {
      const { niveau, codeOption, indexe, titulaire } = req.body
      if (!niveau || !codeOption) {
        return res.status(400).json('Veuillez renseigner les champs')
      }
      asyncLab.waterfall(
        [
          function (done) {
            modelOption
              .findOne({ active: true, codeOption })
              .then((response) => {
                if (response) {
                  done(null, response)
                } else {
                  return res.status(400).json('Option introuvable')
                }
              })
              .catch(function (err) {
                return res.status(400).json("Erreur d'enregistrement")
              })
          },
          function (option, done) {
            modelClasse
              .findOne({
                niveau,
                codeOption,
                indexe,
              })
              .then((classeFound) => {
                if (classeFound) {
                  return res.status(400).json('La classe existe deja')
                } else {
                  done(null, option)
                }
              })
              .catch(function (err) {
                return res.status(400).json("Erreur d'enregistrement")
              })
          },
          function (option, done) {
            modelClasse
              .create({
                niveau,
                codeOption: option.codeOption,
                titulaire,
                indexe,
                codeClasse: `${option.codeOption}.${generateString(4)}`,
              })
              .then((response) => {
                done(response)
              })
              .catch(function (err) {
                return res.status(400).json("Erreur d'enregistrement")
              })
          },
        ],
        function (result) {
          if (result) {
            return res.status(200).json(result)
          } else {
            return res.status(400).json("Erreur d'enregistrement")
          }
        },
      )
    } catch (error) {
      return res.status(400).json("Erreur d'enregistrement")
    }
  },
  readClasse: (req, res) => {
    try {
      const { codeEtablissement } = req.params
      modelOption.aggregate([
        { $match: { codeEtablissement } },
        {
          $lookup: {
            from: 'classe',
            localField: 'codeOption',
            foreignField: 'codeOption',
            as: 'classe',
          },
        },
      ])
    } catch (error) {
      console.log(error)
    }
  },
}
