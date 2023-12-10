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

module.exports = {
  ReadCoursSimple: (req, res) => {
    modelCours
      .aggregate([rdomaine, sousdomaine])
      .then((response) => {
        return res.send(response)
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  Cours: (req, res) => {
    try {
      const {
        codeClasse,
        id,
        validExamen,
        identifiant,
        branche,
        maxima,
      } = req.body
      console.log(req.body);

      const date = new Date().getTime()
      console.log(date);
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
                id : date,
                idCours: date,
                validExamen,
                identifiant,
              })
              .then((Save) => {
                if (Save) {
                  let match = { $match: { _id: Save._id } }
                  modelCours
                    .aggregate([match, rdomaine, sousdomaine])
                    .then((response) => {
                      return res.status(200).json(response[0])
                    })
                    .catch(function (err) {
                      console.log(err)
                    })
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
  ModifierCours: (req, res) => {
    const { id, data } = req.body

    if (!id || !data) {
      return res.status(404).json('Veuillez remplir les champs')
    }

    modelCours
      .findByIdAndUpdate(id, data, { new: true })
      .then((modification) => {
        if (modification) {
          let match = { $match: { _id: modification._id } }

          modelCours
            .aggregate([match, rdomaine, sousdomaine, option])
            .then((response) => {
              return res.status(200).json(response[0])
            })
            .catch(function (err) {
              console.log(err)
            })
        } else {
          return res.status(404).json('Erreur de modification')
        }
      })
      .catch(function (error) {
        return res.status(404).json('Catch : ' + error)
      })
  },
}
