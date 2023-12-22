const { ObjectId } = require('mongodb')
const { generateString } = require('../Fonctions/Static_Function')
const modelOption = require('../Models/Option')
const asyncLab = require('async')

exports.addOption = (req, res, next) => {
  try {
    const { option } = req.body
    if (!option) {
      return res.status(404).json("Veuillez entrer l'option")
    }

    asyncLab.waterfall(
      [
        function (done) {
          modelOption
            .findOne({ option })
            .then((response) => {
              if (response) {
                return res.status(404).json('Cette option existe deja')
              } else {
                done(null, true)
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        },
        function (response, done) {
          modelOption
            .create({
              option,
              codeOption: generateString(8),
              id: new Date(),
            })
            .then((options) => {
              if (options) {
                done(null, options)
              } else {
                return res.status(404).json("Erreur d'enregistrement")
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        },
        function (option, done) {
         
          req.recherche = option.codeOption;
          next()
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
}
;(exports.readOption = (req, res) => {
  let codeOption = req.recherche
  let match = codeOption
    ? { $match: { codeOption: codeOption } }
    : { $match: {} }
    console.log(codeOption)
  try {
    modelOption
      .aggregate([
        match,
        {
          $lookup: {
            from: 'classes',
            localField: 'codeOption',
            foreignField: 'codeOption',
            as: 'classe',
          },
        },
      ])
      .then((options) => {
        return codeOption
          ? res.status(200).json(options[0])
          : res.status(200).json(options.reverse())
      })
      .catch(function (err) {
        console.log(err)
      })
  } catch (error) {
    console.log(error)
  }
}),
  (exports.updateOption = (req, res) => {
    try {
      const { id, data } = req.body

      modelOption
        .findByIdAndUpdate(id, data, {
          new: true,
        })
        .then((options) => {
          return res.status(200).json(options)
        })
        .catch(function (err) {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }
  })
