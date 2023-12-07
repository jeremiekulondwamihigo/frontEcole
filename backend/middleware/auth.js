const jwt = require("jsonwebtoken");
const Model_Agent = require("../Models/Model_Agent");
const Model_Etablissement = require("../Models/Model_Etablissement");

module.exports = {
  protect: async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(400).json('token expired');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const etablissement = await Model_Etablissement.findById(decoded.id);

      if (!etablissement) {
        return res.status(400).json('token expired');
      }

      req.user =  etablissement;
      next();
    } catch (error) {
      return res.status(400).json('token expired');
    }
  },
};
