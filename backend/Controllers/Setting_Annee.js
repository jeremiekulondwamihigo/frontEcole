const Model_Year = require("../Models/Model_Annee");
const { isEmpty, generateString } = require("../Fonctions/Static_Function");
const AsyncLib = require("async");
const Model_Eleve = require("../Models/EleveInscrit");
const { ObjectId } = require("mongodb");

module.exports = {
  Add_Annee: (req, res) => {
    const { annee, codeEtablissement } = req.body;

    try {
      if (!annee || !codeEtablissement) {
        return res.status(404).json("Veuillez remplir le champs");
      }
      let year = annee.trim();
      AsyncLib.waterfall(
        [
          function (done) {
            Model_Year.findOne({ annee: year, codeEtablissement })
              .then((response) => {
                if (response) {
                  return res
                    .status(404)
                    .json("L'année " + year + " existe déjà");
                } else {
                  done(null, response);
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          },
          function (response, done) {
            Model_Year.create({
              annee,
              codeEtablissement,
              code_Annee: generateString(5),
              id : new Date(),
            })
              .then((anneeCreate) => {
                done(anneeCreate);
              })
              .catch(function (err) {
                console.log(err);
              });
          },
        ],
        function (anneeCreate) {
          if (anneeCreate) {
            return res.status(200).json(anneeCreate);
          } else {
            return res.status(404).json("Erreur d'enregistrement");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  Modificate_Year: (req, res) => {

    const { valeur, codeEtablissement } = req.body;
    console.log(req.body)

    try {
      AsyncLib.waterfall(
        [
          function (done) {
            if (valeur === true) {
              Model_Year.findOne({ active: true, codeEtablissement }).then((anneActifFound) => {
                if (anneActifFound) {
                  return res
                    .status(404)
                    .json("L'année " + anneActifFound.annee + " est en cours");
                } else {
                  done(null, true);
                }
              });
            } else {
              done(null, true);
            }
          },
          function (anneeCreate, done) {
            Model_Year.findOneAndUpdate({codeEtablissement, _id : new ObjectId(req.params.id)}
             ,
              { active: valeur },
              {
                new: true,
              }
            ).then((result) => done(result));
          },
        ],
        function (result) {
          if (result) {
            return res.status(200).json(result);
          } else {
            return res.status(404).json("Erreur d'enregistrement");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  Read_Year: (req, res) => {
    const {codeEtablissement} = req.params
    Model_Year.find({codeEtablissement}).then((anneeFound) => {
      res.send(anneeFound.reverse());
    });
  },
  DeleteYear: async (req, res) => {
    const { id } = req.params;

    AsyncLib.waterfall(
      [
        function (done) {
          Model_Eleve.find({ code_Annee: id }).then(function (eleve) {
            if (eleve.length > 0) {
              return res
                .status(201)
                .json("Impossible de supprimer cette année");
            } else {
              done(null, eleve);
            }
          });
        },
        function (eleve, done) {
          Model_Year.findOne({
            code_Annee: id,
          }).then((AnneeFound) => {
            if (!AnneeFound) {
              return res.status(201).send("Year not found...");
            } else {
              done(null, AnneeFound);
            }
          });
        },
        function (annee, done) {
          Model_Year.findByIdAndDelete(annee._id).then((response) => {
            done(response);
          });
        },
      ],
      function (response) {
        if (response) {
          return res.status(200).send(response);
        } else {
          return res.status(201).send("Erreur de suppression");
        }
      }
    );
  },
};
