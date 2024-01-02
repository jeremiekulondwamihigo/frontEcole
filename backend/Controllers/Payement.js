const modelPayement = require('../Models/Payement')
const modelEleve = require('../Models/EleveInscrit')
const modelTitre = require('../Models/TitreFrais')
const asyncLab = require('async')
const _ = require('lodash')
const modelAnnee = require('../Models/Model_Annee')
const { generateString } = require('../Fonctions/Static_Function')
const { ObjectId } = require('mongodb')

module.exports = {
  Payement: (req, res, next) => {
    try {
      const { montant, codeTitle, codeEleve, codeAnnee, codeAgent } = req.body
      if (!montant || !codeTitle || !codeEleve || !codeAnnee || !codeAgent) {
        return res.status(201).json('Veuillez renseigner les champs')
      }
      asyncLab.waterfall(
        [
          //Recherche de l'élève et sa classe afin de voir les frais qu'il est sensé payé
          function (done) {
            modelEleve
              .aggregate([
                { $match: { codeEleve, codeAnnee } },
                {
                  $lookup: {
                    from: 'classes',
                    localField: 'codeClasse',
                    foreignField: 'codeClasse',
                    as: 'classe',
                  },
                },
                { $unwind: '$classe' },
              ])
              .then((eleve) => {
                if (eleve) {
                  done(null, eleve)
                } else {
                  return res.status(201).json('Eleve introuvable')
                }
              })
              .catch(function (err) {
                return res.status(201).json('Erreur')
              })
          },
          function (eleve, done) {
            //Recherche de frais que l'élève doit payer pour l'année scolaire envoyée
            modelTitre
              .aggregate([
                { $match: { codeTitle } },
                {
                  $lookup: {
                    from: 'frais',
                    pipeline: [
                      { $match: { codeClasse: eleve[0].classe.codeClasse, codeTitle } },
                    ],
                    as: 'frais',
                  },
                },
                {
                  $unwind: '$frais',
                },
              ])
              .then((result) => {
                if (result) {
                  done(null, eleve, result)
                } else {
                  return res.status(201).json('Frais introuvable')
                }
              })
              .catch(function (err) {
                console.log(err)
                return res.status(201).json('Erreur')
              })
          },
          //Recherche montant que l'élève a deja payé pour ce frais
          function (eleve, frais, done) {
            modelPayement
              .find({
                codeEleve: eleve[0].codeEleve,
                codeTitle: frais[0].codeTitle,
              })
              .then((resultat) => {
                if (frais[0].montant === _.sumBy(resultat, 'montant')) {
                  return res.status(201).json('Frais achevé')
                } else {
                  done(null, eleve, frais, resultat)
                }
              })
              .catch(function (err) {
                return res.status(201).json('Erreur')
              })
          },
          function (eleve, frais, prevPayement, done) {
            console.log(frais)
            //Enregistrement payement
            modelPayement
              .create({
                montant,
                codeTitle: frais[0].codeTitle,
                codeEleve: eleve[0].codeEleve,
                codeAgent,
                codeAnnee,
                id: generateString(7),
                dateSave: new Date(),
                reste:
                  frais[0].frais.montant -
                  (_.sumBy(prevPayement, 'montant') + parseFloat(montant)),
              })
              .then((result) => {
                done(result)
              })
              .catch(function (err) {
                if (err.errors['reste']) {
                  return res.status(201).json('Le reste doit etre 0 pas moins')
                } else {
                  return res.status(201).json('Erreur')
                }
              })
          },
        ],
        function (result) {
          if (result) {
            req.recherche = {
              codeEleve: result.codeEleve,
              codeAnnee: result.codeAnnee,
            }
            next()
          } else {
            return res.status(201).json("Erreur d'enregistrement")
          }
        },
      )
    } catch (error) {
      console.log(error)
    }
  },
  ReadPayement: (req, res) => {
    try {
      asyncLab.waterfall([
        function (done) {
          modelAnnee
            .findOne({ active: true })
            .then((annee) => {
              if (annee) {
                done(null, annee)
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        },
        function (annee, done) {
          modelTitre
            .aggregate([
              { $match: { codeAnnee: annee.codeAnnee } },
              {
                $lookup: {
                  from: 'payements',
                  localField: 'codeTitle',
                  foreignField: 'codeTitle',
                  as: 'payment',
                },
              },
              {
                $unwind: '$payment',
              },
              {
                $lookup: {
                  from: 'eleves',
                  localField: 'payment.codeEleve',
                  foreignField: 'codeEleve',
                  as: 'eleve',
                },
              },
              {
                $unwind: '$eleve',
              },
              {
                $addFields: {
                  nom: {
                    $concat: [
                      '$eleve.nom',
                      ' ',
                      '$eleve.postnom',
                      ' ',
                      '$eleve.prenom',
                    ],
                  },
                  somme: '$payment.montant',
                  reste: '$payment.reste',
                  createdAt: '$payment.createdAt',
                  dateSave: '$payment.dateSave',
                },
              },
              {
                $project: {
                  eleve: 0,
                  payment: 0,
                  codeAnnee: 0,
                  debut: 0,
                  fin: 0,
                  codeTitle: 0,
                },
              },
            ])
            .then((title) => {
              return res.status(200).json(title)
            })
        },
      ])
    } catch (error) {
      console.log(error)
    }
  },
  readOnePayment: (req, res) => {
    try {
      const resultat = req.recherche
      const { codeEleve, codeAnnee } = req.params
      let match = resultat
        ? {
            $match: {
              codeEleve: resultat.codeEleve,
              codeAnnee: resultat.codeAnnee,
            },
          }
        : { $match: { codeEleve, codeAnnee } }

      if (!codeEleve || !codeAnnee) {
      }
      modelPayement
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
            $addFields: {
              titre: '$title.title',
            },
          },
          {
            $project: { title: 0 },
          },
        ])
        .then((result) => {
          if (result) {
            return res.status(200).json(result.reverse())
          } else {
            return res.status(200).json([])
          }
        })
        .catch(function (err) {
          if (err) {
            return res.status(200).json([])
          }
        })
    } catch (error) {
      console.log(error)
    }
  },
}
