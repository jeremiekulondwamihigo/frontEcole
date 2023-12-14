const Model_User = require('../Models/Users')
const jwt = require('jsonwebtoken')
const Model_Etablissement = require('../Models/Model_Etablissement')
const Model_EnsParent = require('../Models/Ens_Parent')
const { ObjectId } = require('mongodb')

exports.login = async (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(200).json('Veuillez renseigner les champs')
  }
  try {
    //const user = await Model_User.aggregate([ look])
    const user = await Model_User.findOne({ username }).select('+password')

    if (!user) {
      return res.status(200).json('username incorrect')
    }

    const isMatch = await user.matchPasswords(password)

    if (!isMatch) {
      return res.status(200).json('password incorrect')
    }
    sendToken(user, 200, res)
  } catch (error) {
    return res.status(200).json('Erreur')
  }
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  console.log(decoded.id)
  if (['parent', 'enseignant'].includes(decoded.fonction)) {
    Model_EnsParent.findOne({_id : new ObjectId(decoded.id)})
    .then((userLog) => {
      console.log(userLog)
      return res.status(statusCode).json({
        data: { fonction: decoded.fonction, data: userLog },
        token,
      })
    })
    .catch(function (error) {
      console.log(error)
    })

  } else {
    Model_Etablissement.findById(decoded.id)
      .then((login) => {
        return res.status(statusCode).json({
          data: { fonction: decoded.fonction, data: login },
          token,
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
