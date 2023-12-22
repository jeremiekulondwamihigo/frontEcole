const modelCours = require('../Models/Cours')

let rdomaine = {
  $lookup: {
    from: 'domaines',
    localField: 'identifiant',
    foreignField: 'code_domaine',
    as: 'domaine',
  },
}

let sousdomaine = {
  $lookup: {
    from: 'sousdomaines',
    localField: 'identifiant',
    foreignField: 'code_sous_domaine',
    as: 'sousdomaine',
  },
}
let enseignantCours = {
  $lookup: {
    from: 'parents',
    localField: 'idEnseignant',
    foreignField: 'code',
    as: 'enseignant',
  },
}

module.exports = {
  ReadCoursSimple: (req, res) => {
    let idCours = req.recherche
    let match = idCours
      ? { $match: { idCours: idCours.idCours } }
      : { $match: {} }
    modelCours
      .aggregate([match, rdomaine, sousdomaine, enseignantCours])
      .then((response) => {
        return idCours ? res.send(response[0]) : res.send(response)
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  Cours: (req, res, next) => {
    try {
      const {
        codeClasse,
        id,
        validExamen,
        identifiant,
        branche,
        maxima,
      } = req.body

      const date = new Date().getTime()
      if (!branche || !maxima || !codeClasse || !date) {
        return res.status(404).json('Veuillez remplir les champs')
      }

      modelCours
        .findOne({
          branche,
          codeClasse,
        })
        .then((BrancheFound) => {
          if (BrancheFound) {
            return res.status(404).json('Ce cours existe déjà')
          }
          if (!BrancheFound) {
            modelCours
              .create({
                branche,
                maxima,
                codeClasse,
                id: date,
                idCours: date,
                validExamen,
                identifiant,
              })
              .then((Save) => {
                if (Save) {
                  req.recherche = { idCours: Save.idCours }
                  next()
                } else {
                  return res.status(404).json("Erreur d'enregistrement")
                }
              })
              .catch(function (error) {
                return res.status(404).json('error : ' + error)
              })
          }
        })
        .catch(function (error) {
          return res.status(404).json('error : ' + error)
        })
    } catch (error) {
      return res.status(404).json('error : ' + error)
    }
  },
  ModifierCours: (req, res, next) => {
    const { id, data } = req.body

    if (!id || !data) {
      return res.status(404).json('Veuillez remplir les champs')
    }

    modelCours
      .findByIdAndUpdate(id, data, { new: true })
      .then((modification) => {
        if (modification) {
          req.recherche = { idCours: modification.idCours }
          next()
        } else {
          return res.status(404).json('Erreur de modification')
        }
      })
      .catch(function (error) {
        return res.status(404).json('Catch : ' + error)
      })
  },
}
