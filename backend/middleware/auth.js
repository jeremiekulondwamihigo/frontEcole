const jwt = require("jsonwebtoken");
const Model_Etablissement = require("../Models/Model_Etablissement");
const Model_Parent = require("../Models/Ens_Parent");

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
      return res.status(201).json('token expired');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const etablissement = await Model_Etablissement.findById(decoded.id);
     
      const parent = await Model_Parent.findById(decoded.id);

      if (!etablissement && !parent) {
        return res.status(201).json('token expired');
      }

      req.user =  etablissement ? etablissement : parent;
      next();
    } catch (error) {
      console.log(error)
      return res.status(201).json('token expired');
    }
  },
};
