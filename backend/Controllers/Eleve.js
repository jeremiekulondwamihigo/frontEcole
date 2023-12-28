const {
  generateNumber,
  generateString,
} = require('../Fonctions/Static_Function')
const Model_Eleve = require('../Models/Eleves')
const Model_Annee = require('../Models/Model_Annee')
const asyncLab = require('async')
const ModelOption = require('../Models/Option')
const ModelClasse = require('../Models/Classe')
const ModelEleveInscrit = require('../Models/EleveInscrit')

const lookAnnee = {
  $lookup: {
    from: 'annees',
    localField: 'codeAnnee',
    foreignField: 'codeAnnee',
    as: 'annee',
  },
}
const unwindAnnee = { $unwind: '$annee' }
const loookInfoEleve = {
  $lookup: {
    from: 'eleves',
    localField: 'codeEleve',
    foreignField: 'codeEleve',
    as: 'eleve',
  },
}

const unwindEleve = { $unwind: '$eleve' }
const loookClasse = {
  $lookup: {
    from: 'classes',
    localField: 'codeClasse',
    foreignField: 'codeClasse',
    as: 'classe',
  },
}
const unwindOption = { $unwind: '$option' }
const loookOption = {
  $lookup: {
    from: 'options',
    localField: 'classe.codeOption',
    foreignField: 'codeOption',
    as: 'option',
  },
}

const unwindClasse = { $unwind: '$classe' }

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
  ReadEleve: (req, res) => {
    try {
      Model_Eleve.find({}).then((response) => {
        return res.status(200).json(response.reverse())
      })
    } catch (error) {
      console.log(error)
    }
  },
  Inscription: (req, res) => {
    try {
      const { codeOption, codeClasse, codeEleve } = req.body
      asyncLab.waterfall(
        [
          function (done) {
            Model_Annee.findOne({ active: true })
              .then((anneeFound) => {
                if (anneeFound) {
                  done(null, anneeFound)
                } else {
                  return res
                    .status(404)
                    .json("Veuillez activer l'année scolaire")
                }
              })
              .catch(function (err) {
                console.log(err)
              })
          },
          function (annee, done) {
            ModelOption.findOne({ active: true, codeOption })
              .then((option) => {
                if (option) {
                  done(null, annee)
                } else {
                  return res.status(404).json('Cette option est désactivée')
                }
              })
              .catch(function (err) {
                console.log(err)
              })
          },
          function (annee, done) {
            ModelClasse.findOne({ active: true, codeClasse })
              .then((classe) => {
                if (classe) {
                  done(null, annee, classe)
                } else {
                  return res.status(404).json('Cette classe est désactivée')
                }
              })
              .catch(function (err) {
                console.log(err)
              })
          },
          function (annee, classe, done) {
            ModelEleveInscrit.findOne({
              codeEleve,
              codeAnnee: annee.codeAnnee,
            }).then((eleveFound) => {
              if (eleveFound) {
                return res
                  .status(404)
                  .json("L'élève est enregistré dans une autre classe")
              } else {
                done(null, annee, classe)
              }
            })
          },
          function (annee, classe, done) {
            ModelEleveInscrit.create({
              id: new Date(),
              codeEleve,
              codeAnnee: annee.codeAnnee,
              codeClasse: classe.codeClasse,
              ref: generateString(8),
            })
              .then((eleve) => {
                done(null, eleve)
              })
              .catch(function (err) {
                console.log(err)
              })
          },
          function (result, done) {
            ModelEleveInscrit.aggregate([
              { $match: { _id: result._id } },
              lookAnnee,
              unwindAnnee,
              loookInfoEleve,
              unwindEleve,
              loookClasse,
              unwindClasse,
              loookOption,
              unwindOption,
            ])
              .then((resultat) => {
                if (resultat) {
                  done(resultat)
                }
              })
              .catch(function (err) {
                console.log(err)
              })
          },
        ],
        function (result) {
          if (result) {
            return res.status(200).json(result[0])
          } else {
            return res.status(404).json("Erreur d'enregistrement")
          }
        },
      )
    } catch (error) {
      console.log(error)
    }
  },
  ReadInscrit: (req, res) => {
    try {
      ModelEleveInscrit.aggregate([
        lookAnnee,
        unwindAnnee,
        loookInfoEleve,
        unwindEleve,
        loookClasse,
        unwindClasse,
        loookOption,
        unwindOption,
      ])
        .then((result) => {
          if (result) {
            return res.status(200).json(result)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }
  },
  UpdateEleve: (req, res) => {
    try {
      const { id, date_naissance, lieu_naissance,
         nationalite, nomPere, professionPere, nomMere,
         professionMere 
        } = req.body
      asyncLab.waterfall(
        [
          function (done) {
            Model_Eleve.findByIdAndUpdate(id, {
              date_naissance, lieu_naissance,
         nationalite, nomPere, professionPere, nomMere,
         professionMere 
            }, { new: true }).then(
              (result) => {
                if (result) {
                  done(null, result)
                } else {
                  console.log(result);
                  return res.status(404).json('Erreur')
                }
              },
            )
          },
          function (result, done) {
            ModelEleveInscrit.aggregate([
              { $match: { codeEleve: result.codeEleve } },
              lookAnnee,
              unwindAnnee,
              loookInfoEleve,
              unwindEleve,
              loookClasse,
              unwindClasse,
              loookOption,
              unwindOption,
            ])
              .then((resultat) => {
                if (resultat) {
                  done(resultat)
                }
              })
              .catch(function (err) {
                console.log(err)
              })
          },
        ],
        function (result) {
          if (result) {
            return res.status(200).json(result[0])
          } else {
            return res.status(404).json("Erreur d'enregistrement")
          }
        },
      )
    } catch (error) {
      console.log(error)
    }
  },
}
