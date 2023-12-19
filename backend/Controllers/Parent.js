const { ObjectId } = require('mongodb')
const modelParent = require('../Models/Ens_Parent')
const modelEleveInfo = require('../Models/Eleves')
const modelUser = require('../Models/Users')
const asyncLab = require('async')
const modelAnnee = require('../Models/Model_Annee')

exports.InfoEleve = (req, res) => {
  console.log(req)
  try {
    const {
      nomPere,
      professionPere,
      nomMere,
      professionMere,
      nationalite,
      date_naissance,
      lieu_naissance,
      _id, //_id de l'élève à modifier
    } = req.body

    asyncLab.waterfall(
      [
        function (done) {
          modelEleveInfo
            .findByIdAndUpdate(
              _id,
              {
                $set: {
                  nomPere,
                  professionPere,
                  nomMere,
                  professionMere,
                  nationalite,
                  date_naissance,
                  lieu_naissance,
                },
              },
              { new: true },
            )
            .then((response) => {
              done(response)
            })
        },
      ],
      function (result) {
        if (result) {
          return res.status(200).json(result)
        } else {
          return res.status(404).json('Erreur')
        }
      },
    )
  } catch (error) {
    console.log(error)
  }
}

exports.ListeDesEleve = (req, res) => {
  try {
    const { id } = req.params
    asyncLab.waterfall([
      function (done) {
        modelAnnee.findOne({ active: true }).then((annee) => {
          if (annee) {
            done(null, annee)
          } else {
            return res.status(201).json('Aucune année en cours')
          }
        })
      },
      function (annee, done) {
        modelParent
          .aggregate([
            { $match: { _id: new ObjectId(id) } },
            {
              $lookup: {
                from: 'eleveinscrits',
                localField: 'eleveListe',
                foreignField: 'codeEleve',
                as: 'eleve',
              },
            },
            {
              $unwind: '$eleve',
            },
            {
              $lookup: {
                from: 'classes',
                localField: 'eleve.codeClasse',
                foreignField: 'codeClasse',
                as: 'classe',
              },
            },
            {
              $unwind: '$classe',
            },
            {
              $lookup: {
                from: 'options',
                localField: 'classe.codeOption',
                foreignField: 'codeOption',
                as: 'option',
              },
            },
            {
              $unwind: '$option',
            },

            { $match: { 'eleve.codeAnnee': annee.codeAnnee } },
            {
              $lookup: {
                from: 'eleves',
                localField: 'eleve.codeEleve',
                foreignField: 'codeEleve',
                as: 'eleveinfo',
              },
            },
            {
              $unwind: '$eleveinfo',
            },
            {
              $addFields: {
                matricule: '$eleve.codeEleve',
                nom: '$eleveinfo.nom',
                postnom: '$eleveinfo.postnom',
                prenom: '$eleveinfo.prenom',
                classe: '$classe.niveau',
                option: '$option.option',
                codeEleve: '$eleve.codeEleve',
                photo: '$eleveinfo.filename',
                annee: annee.annee,
              },
            },
            {
              $project: {
                eleve: 0,
                id: 0,
                active: 0,
                eleveListe: 0,
                telephone: 0,
                status: 0,
              },
            },
          ])
          .then((eleve) => {
            if (eleve) {
              return res.status(200).json(eleve)
            }
          })
      },
    ])
  } catch (error) {
    console.log(error)
  }
}
exports.AddParent = (req, res) => {
  try {
    const { nom, telephone, status } = req.body
    console.log(req.body)
    if (!nom || !telephone) {
      return res
        .status(404)
        .json('Veuillez renseigner le nom et le numero de telephone')
    }
    asyncLab.waterfall([
      function (done) {
        modelParent
          .find({
            $or: [{ nom: nom.toUpperCase() }, { telephone: telephone }],
          })
          .then((parent) => {
            if (parent.length > 0) {
              return res
                .status(404)
                .json('Ce numero est utilisé par un autre parent')
            } else {
              done(null, true)
            }
          })
      },
      function (parents, done) {
        modelParent
          .create({ nom, telephone, status, id: new Date() })
          .then((parent) => {
            done(null, parent)
          })
      },
      function (parent, done) {
        if (parent) {
          modelUser
            .create({
              username: parent.telephone,
              password: '123456',
              fonction: 'parent',
              _id: new ObjectId(parent._id),
            })
            .then((userCreate) => {
              if (userCreate) {
                return res.status(200).json(parent)
              } else {
                return res.status(404).json("Erreur d'enregistrement")
              }
            })
        } else {
          return res.status(404).json("Erreur d'enregistrement")
        }
      },
    ])
  } catch (error) {
    console.log(error)
  }
}

exports.AffecterEleve = (req, res) => {
  try {
    const { _idParent, codeEleve } = req.body
    if (!_idParent || !codeEleve) {
      return res.status(404).json("Veuillez renseigner le parent et l'élève")
    }
    asyncLab.waterfall(
      [
        function (done) {
          modelParent
            .findOneAndUpdate(
              { active: true, _id: new ObjectId(_idParent) },
              {
                $addToSet: {
                  eleveListe: codeEleve,
                },
              },
              { new: true },
            )
            .then((parent) => {
              done(parent)
            })
        },
      ],
      function (result) {
        if (result) {
          return res.status(200).json(result)
        } else {
          return res.status(404).json("Erreur d'affectation")
        }
      },
    )
  } catch (error) {
    console.log(error)
  }
}
exports.DeleteEleve = (req, res) => {
  try {
    const { _idParent, codeEleve } = req.body
    if (!_idParent || !codeEleve) {
      return res.status(404).json('Erreur')
    }
    asyncLab.waterfall(
      [
        function (done) {
          modelParent
            .findOneAndUpdate(
              { _id: new ObjectId(_idParent) },
              {
                $pull: {
                  eleveListe: codeEleve,
                },
              },
              { new: true },
            )
            .then((parent) => {
              done(parent)
            })
        },
      ],
      function (result) {
        if (result) {
          return res.status(200).json(result)
        } else {
          return res.status(404).json('Erreur')
        }
      },
    )
  } catch (error) {
    console.log(error)
  }
}
exports.ListeParentEnseignant = (req, res) => {
  try {
    modelParent.find({}).then((result) => {
      if (result) {
        console.log(result)
        return res.status(200).json(result)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
