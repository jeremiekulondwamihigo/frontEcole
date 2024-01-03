const modelRecouvrement = require('../Models/Recouvrement')
const asyncLab = require('async')
const modelAnnee = require('../Models/Model_Annee')
const modelFrais = require('../Models/Frais')
const { ObjectId } = require('mongodb')

module.exports = {
  AddRecouvrement: (req, res, next) => {
    try {
      const { codeTitle, pourcentage } = req.body
      if (!codeTitle || !pourcentage) {
        return res.status(404).json('Veuillez renseigner les champs')
      }
      if (parseInt(pourcentage) > 100) {
        return res
          .status(404)
          .json('Le pourcentage doit etre egal ou inférieur à 100')
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
                  return res.status(404).json('Aucune année active')
                }
              })
              .catch(function (err) {
                return res.status(404).json('Error')
              })
          },
          function (annee, done) {
            modelRecouvrement
              .findOne({
                codeTitle,
              })
              .then((frais) => {
                if (frais) {
                  return res
                    .status(404)
                    .json("Veuillez modifier l'enregistrement précedente")
                } else {
                  done(null, frais)
                }
              })
              .catch(function (err) {
                return res.status(404).json('Error')
              })
          },
          function (frais, done) {
            modelRecouvrement
              .create({
                codeTitle: codeTitle,
                pourcentage,
              })
              .then((recouvrement) => {
                done(recouvrement)
              })
              .catch(function (err) {
                return res.status(404).json('Error')
              })
          },
        ],
        function (recouvrement) {
          if (recouvrement) {
            req.recherche = recouvrement._id
            next()
          } else {
            return res.status(404).json('Error')
          }
        },
      )
    } catch (error) {
      console.log(error)
    }
  },
  readSetRecouvrement: (req, res) => {
    console.log('yes')
    try {
      const recherche = req.recherche
      let match = recherche
        ? { $match: { _id: new ObjectId(recherche) } }
        : { $match: {} }
      console.log(match)
      asyncLab.waterfall(
        [
          function (done) {
            modelAnnee
              .findOne({ active: true })
              .then((annee) => {
                if (annee) {
                  done(null, annee)
                } else {
                  return res.status(404).json('Année introuvable')
                }
              })
              .catch(function (err) {
                return res.status(404).json('Error')
              })
          },
          function (annee, done) {
            console.log(annee)
            modelRecouvrement
              .aggregate([
                match,
                {
                  $lookup: {
                    from: 'titrefrais',
                    localField: 'codeTitle',
                    foreignField: 'codeTitle',
                    as: 'title',
                  },
                },
                {
                  $unwind: '$title',
                },

                {
                  $match: { 'title.codeAnnee': annee.codeAnnee },
                },
              ])
              .then((response) => {
                done(response)
              })
          },
        ],
        function (recouvrement) {
          if (recouvrement) {
            return recherche ? res.status(200).json(recouvrement[0]) : res.status(200).json(recouvrement)
          } else {
            return res.status(200).json([])
          }
        },
      )
    } catch (error) {
      console.log(error)
    }
  },
  updateRecouvrement: (req, res, next) => {
    try {
      const { id, pourcentage, active } = req.body
      modelRecouvrement
        .findByIdAndUpdate(id, { pourcentage, active }, { new: true })
        .then((recouvrement) => {
          if (recouvrement) {
            req.recherche = id
            next()
          } else {
            return res.status(404).json('Erreur')
          }
        })
        .catch(function (err) {
          return res.status(404).json('Erreur')
        })
    } catch (error) {
      console.log(error)
    }
  },
}
