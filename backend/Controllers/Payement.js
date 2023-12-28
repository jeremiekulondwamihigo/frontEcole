const modelPayement = require('../Models/Payement')
const modelEleve = require('../Models/EleveInscrit')
const modelTitre = require('../Models/TitreFrais')
const asyncLab = require('async')

module.exports = {
  Payement: (req, res) => {
    try {
      const { montant, codeTitle, codeEleve, codeAnnee } = req.body
      if (!montant || !codeTitle || !codeEleve || !codeAnnee) {
        return res.status(404).json('Veuillez renseigner les champs')
      }
      asyncLab.waterfall([
        function (done) {
          modelEleve
            .findOne({ codeEleve, codeAnnee })
            .then((eleve) => {
              if (eleve) {
                done(null, eleve)
              } else {
                return res.status(404).json('Eleve introuvable')
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        },
     
      ])
    } catch (error) {
      console.log(error)
    }
  },
}
