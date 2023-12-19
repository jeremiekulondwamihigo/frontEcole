const modelPeriode = require('../Models/Periode')
const asyncLab = require('async')

exports.AddPeriode = (req, res) => {
  try {
    const { periode } = req.body
    asyncLab.waterfall(
      [
        function (done) {
          modelPeriode
            .findOne({})
            .then((periodeFound) => {
              done(null, periodeFound)
            })
            .catch(function (err) {
              if (err) {
                return res.status(404).json('Erreur')
              }
            })
        },
        function (periodeFound, done) {
          if (periodeFound) {
            modelPeriode
              .findByIdAndUpdate(periodeFound._id, { periode }, { new: true })
              .then((result) => {
                done(result)
              })
              .catch(function (err) {
                if (err) {
                  return res.status(404).json('Erreur')
                }
              })
          } else {
            modelPeriode
              .create({ periode })
              .then((result) => {
                done(result)
              })
              .catch(function (err) {
                if (err) {
                  return res.status(404).json('Erreur')
                }
              })
          }
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
exports.ReadPeriode = (req, res) => {
  try {
    modelPeriode.find({}).then((result) => {
      if (result) {
        return res.status(200).json(result)
      } else {
        return res.status(404).json([])
      }
    })
  } catch (error) {
    console.log(error)
  }
}
