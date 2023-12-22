const modelTitreFrais = require('../Models/TitreFrais')
const asyncLab = require('async')
const modelAnnee = require('../Models/Model_Annee')
const modelFrais = require('../Models/Frais')
const { ObjectId } = require('mongodb')
const { generateNumber } = require('../Fonctions/Static_Function')

let lookFrais = {
  $lookup: {
    from: 'frais',
    localField: 'codeTitle',
    foreignField: 'codeTitle',
    as: 'frais',
  },
}

exports.AddTitreFrais = (req, res, next) => {
  try {
    const { title, debut, fin } = req.body
    if (!title || !debut || !fin) {
      return res.status(404).json('Erreur')
    }
    asyncLab.waterfall(
      [
        function (done) {
          modelAnnee
            .findOne({ active: true })
            .then((annee) => {
              if (annee) {
                done(null, annee)
              } else {
                return res.status(404).json('Aucune année en cours')
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        },
        function (annee, done) {
          modelTitreFrais
            .findOne({
              title: title.toUpperCase(),
              codeAnnee: annee.codeAnnee,
            })
            .then((existe) => {
              if (existe) {
                return res.status(404).json('Ce frais existe deja')
              } else {
                done(null, annee)
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        },
        function (annee, done) {
          modelTitreFrais
            .create({
              title,
              codeAnnee: annee.codeAnnee,
              debut,
              fin,
              codeTitle: generateNumber(6),
            })
            .then((frais) => {
              done(frais)
            })
            .catch(function (err) {
              console.log(err)
            })
        },
      ],
      function (result) {
        if (result) {
          req.recherche = result.codeTitle
          next()
        } else {
          return res.status(404).json('Erreur')
        }
      },
    )
  } catch (error) {
    console.log(error)
  }
}
exports.readTitle = (req, res) => {
  let codeTitle = req.recherche

  try {
    asyncLab.waterfall(
      [
        function (done) {
          modelAnnee.findOne({ active: true }).then((annee) => {
            if (annee) {
              done(null, annee)
            }
          })
        },
        function (annee, done) {
          let match = codeTitle
            ? {
                $match: {
                  codeTitle: codeTitle,
                  codeAnnee: annee.codeAnnee,
                },
              }
            : { $match: { codeAnnee: annee.codeAnnee } }

          modelTitreFrais.aggregate([match, lookFrais]).then((frais) => {
            done(frais)
          })
        },
      ],
      function (frais) {
        if (frais) {
          return codeTitle
            ? res.status(200).json(frais[0])
            : res.status(200).json(frais)
        } else {
          return res.status(200).json([])
        }
      },
    )
  } catch (error) {}
}
exports.AddFrais = (req, res, next) => {
  try {
    const { montant, idClasse, idTitle } = req.body
    asyncLab.waterfall(
      [
        function (done) {
          modelFrais
            .findOne({
              codeTitle: idTitle,
              codeClasse: idClasse,
            })
            .then((frais) => {
              if (frais) {
                return res.status(404).json('Le frais existe deja')
              } else {
                done(null, true)
              }
            })
        },
        function (fr, done) {
          modelFrais
            .create({
              codeClasse: idClasse,
              codeTitle: idTitle,
              montant,
            })
            .then((frais) => {
              if (frais) {
                done(frais)
              } else {
                return res.status(404).json('Erreur')
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        },
      ],
      function (result) {
        if (result) {
          req.recherche = result.codeTitle
          next()
        } else {
          return res.status(404).json('Erreur')
        }
      },
    )
  } catch (error) {
    console.log(error)
  }
}
