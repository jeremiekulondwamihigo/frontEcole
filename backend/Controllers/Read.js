const jwt = require('jsonwebtoken')
const Model_Etablissement = require('../Models/Model_Etablissement')
const ModelAgent = require('../Models/Ens_Parent')

module.exports = {
  readUser: async (req, res, next) => {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
      return res.status(400).json('jwt expired')
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      var matched = { $match: { active: true } }

      const look_agent = {
        $lookup: {
          from: 'agents',
          localField: 'code_agent',
          foreignField: 'code_agent',
          as: 'agent',
        },
      }

      if (decoded.fonction === 'etablissement') {
        Model_Etablissement.aggregate([matched, look_agent])
          .then((login) => {
            const data = login.filter((c) => c._id == decoded.id)
            return res.status(200).json(data[0])
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      if (['parent', 'enseignant'].includes(decoded.fonction)) {
        ModelAgent.findById(decoded.id).then((response) => {
          if (response) {
            return res.status(200).json(response)
          } else {
          }
        })
      }
    } catch (error) {
      return res.status(400).json(error.message)
    }
  },
}
