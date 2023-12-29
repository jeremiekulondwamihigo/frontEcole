const modelPayement = require('../Models/Payement')
const modelEleve = require('../Models/EleveInscrit')
const modelTitre = require('../Models/TitreFrais')
const asyncLab = require('async')
const _ = require('lodash')
const modelAnnee = require('../Models/Model_Annee')

module.exports = {
  Payement: (req, res) => {
    try {
      const { montant, codeTitle, codeEleve, codeAnnee, codeAgent } = req.body
      if (!montant || !codeTitle || !codeEleve || !codeAnnee || !codeAgent) {
        return res.status(404).json('Veuillez renseigner les champs')
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
                  return res.status(404).json('Eleve introuvable')
                }
              })
              .catch(function (err) {
                return res.status(404).json('Erreur')
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
                      { $match: { codeClasse: eleve[0].classe.codeClasse } },
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
                  return res.status(200).json('Frais introuvable')
                }
              })
              .catch(function (err) {
                return res.status(404).json('Erreur')
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
                  return res.status(404).json('Frais achevé')
                } else {
                  done(null, eleve, frais, resultat)
                }
              })
              .catch(function (err) {
                return res.status(404).json('Erreur')
              })
          },
          function (eleve, frais, prevPayement, done) {
            //Enregistrement payement
            modelPayement
              .create({
                montant,
                codeTitle: frais[0].codeTitle,
                codeEleve: eleve[0].codeEleve,
                codeAgent,
                dateSave: new Date(),
                reste:
                  frais[0].frais.montant -
                  (_.sumBy(prevPayement, 'montant') + parseInt(montant)),
              })
              .then((result) => {
                done(result)
              })
              .catch(function (err) {
                if (err.errors['reste']) {
                  return res.status(404).json('Le reste doit etre 0 pas moins')
                } else {
                  return res.status(404).json('Erreur')
                }
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
                $unwind : "$payment"
              },
              {
                $lookup : {
                  from :"eleves",
                  localField : "payment.codeEleve",
                  foreignField:"codeEleve",
                  as:"eleve"
                }
              },
              {
                $unwind : "$eleve"
              },
              {
                $addFields: {
                 nom : {$concat : ["$eleve.nom", " ","$eleve.postnom"," ", "$eleve.prenom"]},
                 somme : "$payment.montant",
                 reste : "$payment.reste",
                 createdAt : "$payment.createdAt",
                 dateSave : "$payment.dateSave"
                }
              },
              {
                $project : {
                  eleve : 0, payment:0, codeAnnee:0, debut:0,fin:0,codeTitle:0
                }
              }
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
  readOnePayment : (req, res)=>{
    try {
      
    } catch (error) {
      console.log(error);
    }
  }
}
