const { ObjectId } = require('mongodb')
const { generateString } = require('../Fonctions/Static_Function')
const modelClasse = require('../Models/Classe')
const modelOption = require('../Models/Option')
const asyncLab = require('async')

;(exports.AddClasse = (req, res) => {
  try {
    const { niveau, codeOption, indexe } = req.body
    if (!niveau || !codeOption) {
      return res.status(404).json('Veuillez renseigner les champs')
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
                return res.status(404).json('Option introuvable')
              }
            })
            .catch(function (err) {
              return res.status(404).json("Erreur d'enregistrement")
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
                return res.status(404).json('La classe existe deja')
              } else {
                done(null, option)
              }
            })
            .catch(function (err) {
              return res.status(404).json("Erreur d'enregistrement")
            })
        },
        function (option, done) {
          modelClasse
            .create({
              niveau,
              codeOption: option.codeOption,

              indexe,
              codeClasse: `${option.codeOption}.${generateString(4)}`,
            })
            .then((response) => {
              if (response) {
                done(null, option)
              } else {
                return res.status(404).json("Erreur d'enregistrement")
              }
            })
            .catch(function (err) {
              return res.status(404).json("Erreur d'enregistrement")
            })
        },
        function (option, done) {
          modelOption
            .aggregate([
              { $match: { _id: new ObjectId(option._id) } },
              {
                $lookup: {
                  from: 'classes',
                  localField: 'codeOption',
                  foreignField: 'codeOption',
                  as: 'classe',
                },
              },
            ])
            .then((options) => {
              done(options)
            })
            .catch(function (err) {
              console.log(err)
            })
        },
      ],
      function (result) {
        if (result.length === 1) {
          return res.status(200).json(result[0])
        } else {
          return res.status(404).json("Erreur d'enregistrement")
        }
      },
    )
  } catch (error) {
    return res.status(404).json("Erreur d'enregistrement")
  }
}),
  (exports.readClasse = (req, res) => {
    try {
      modelOption.aggregate([
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
  })
exports.updateClasse = (req, res, next) => {
  try {
    const { idClasse, codeEnseignant } = req.body
    if (!idClasse || !codeEnseignant) {
      return res.status(404).json("Précisez l'enseignant et la classe")
    }
    asyncLab.waterfall([
      function (done) {
        modelClasse
          .findOne({ codeClasse: idClasse, active: true })
          .then((classe) => {
            if (classe) {
              done(null, classe)
            } else {
              return res.status(404).json('Erreur')
            }
          })
      },
      function (classes, done) {
        modelClasse
          .findByIdAndUpdate(
            classes._id,
            { titulaire: codeEnseignant },
            { new: true },
          )
          .then((classeupdate) => {
            if (classeupdate) {
              req.recherche = classes.codeOption
              next()
            } else {
              return res.status(404).json('Erreur')
            }
          })
      },
    ])
  } catch (error) {
    console.log(error)
  }
}
exports.readAllClasse = (req, res) => {
  try {
    modelClasse
      .aggregate([
        {
          $lookup: {
            from: 'options',
            localField: 'codeOption',
            foreignField: 'codeOption',
            as: 'option',
          },
        },
        {
          $unwind: '$option',
        },
      ])
      .then((response) => {
        if (response) {
          return res.status(200).json(response)
        } else {
          return res.status(200).json([])
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  } catch (error) {
    console.log(error)
  }
}
