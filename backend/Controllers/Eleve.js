const { generateNumber } = require('../Fonctions/Static_Function')
const Model_Eleve = require('../Models/Eleves')
const Model_Annee = require('../Models/Model_Annee')
const asyncLab = require('async')

module.exports = {
  PremEnregistrement: async (req, res) => {
    try {
      const {
        contactTuteur,
        nom,
        postnom,
        prenom,
        nomPere,
        professionPere,
        nomMere,
        professionMere,
        date_naissance,
        lieu_naissance,
        genre,
      } = req.body

      if (
        !nom ||
        !postnom ||
        !genre ||
        !prenom ||
        !lieu_naissance ||
        !date_naissance
      ) {
        return res
          .status(404)
          .json("Le champs ayant l'asteriste est obligatoire")
      }

      asyncLab.waterfall(
        [
          function (done) {
            Model_Eleve.findOne({
              nom: nom.toUpperCase(),
              postnom: postnom.toUpperCase(),
              prenom: prenom.toUpperCase(),
            }).then((response) => {
              if (response) {
                return res
                  .status(404)
                  .json("L'élève " + prenom + ' existe déjà')
              } else {
                done(null, true)
              }
            })
          },
          function (eleve, done) {
            Model_Annee.findOne({ active: true })
              .then((anneeFound) => {
                if (anneeFound) {
                  done(null, anneeFound)
                }
              })
              .catch((error) => {
                return res.status(404).json(error)
              })
          },

          function (anneeFound, done) {
            const code = `${anneeFound.annee
              .split('-')[1]
              .trim()
              .substr(2)}${generateNumber(4)}`
          

            Model_Eleve.create({
              id: new Date(),
              codeEleve: code,
              nom,
              postnom,
              prenom,
              nomPere,
              professionPere,
              nomMere,
              professionMere,
              genre,
              contactTuteur,
              date_naissance,
              lieu_naissance,
            })
              .then((response) => {
                if (response) {
                  done(response)
                } else {
                  done(false)
                }
              })
              .catch((error) => {
                return res.status(404).json(error)
              })
          },
        ],
        function (response) {
          if (response) {
            return res.status(200).json(response)
          } else {
            return res.status(404).json("Erreur d'enregistrement")
          }
        },
      )
    } catch (error) {
      return res.status(404).json(error)
    }
  },
  readEleve : (req, res)=>{
    try {
        Model_Eleve.find({}).then(response=>{
            return res.status(200).json(response)
        })
    } catch (error) {
        console.log(error)
    }
  }
}
