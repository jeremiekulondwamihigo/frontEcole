const { isEmpty } = require("../Fonctions/Static_Function");
const modelEleveInscrit = require("../Models/EleveInscrit");
const asyncLab = require("async");
const { bulletinClasseFunction, BulletinClasse } = require("./Bulletin");

module.exports = {
  FinAnnee: (req, res) => {
    try {
      const { codeEtablissement } = req.body;
      if (isEmpty(codeEtablissement)) {
        return res.status(201).json("Veuillez renseigner les champs");
      }
      modelEleveInscrit.find({ codeEtablissement }).then((eleveFound) => {
        if (eleveFound) {
            return BulletinClasse(req, res);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
