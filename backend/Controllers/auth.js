const Model_User = require("../Models/Users");
const jwt = require("jsonwebtoken");
const Model_Etablissement = require("../Models/Model_Etablissement");
const { ObjectId } = require("mongodb");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Veuillez renseigner les champs", 200));
  }

  try {
    //const user = await Model_User.aggregate([ look])

    const user = await Model_User.findOne({ username : email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("email incorrect", 200));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("password incorrect", 200));
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const look_agent = {
    $lookup: {
      from: "agents",
      localField: "code_agent",
      foreignField: "code_agent",
      as: "agent",
    },
  };
    Model_Etablissement.aggregate([
      { $match: { _id: new ObjectId(decoded.id) } },
      look_agent,
    ])
      .then((login) => {
        return res.status(statusCode).json({
          data: { fonction: decoded.fonction, data: login[0] },
          tokenLogin: { token },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  
};
