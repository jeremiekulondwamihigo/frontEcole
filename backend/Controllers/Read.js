const jwt = require('jsonwebtoken')
const Model_Etablissement = require('../Models/Model_Etablissement')
const ModelAgent = require('../Models/Model_Agent')

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
      return res.status(200).json(false)
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
      if (decoded.fonction === 'ensparent') {
        ModelAgent.findOne({ code_agent: decoded.concerner }).then(
          (response) => {
            if (response) {
              return res.status(200).json({
                data: { fonction: decoded.fonction, data: response[0] },
                tokenLogin: { token },
              })
            } else {
            }
          },
        )
      }
    } catch (error) {
      console.log(error)
      return res.status(200).json(false)
    }
  },
}
