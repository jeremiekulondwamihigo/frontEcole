const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { DeleteYear } = require("../Controllers/Setting_Annee");
const { DeleteEleve } = require("../Controllers/Parent");
const { deleteSetRecouvrement } = require("../Controllers/SetRecouvrement");

router.delete("/annee/:id", DeleteYear)
router.delete("/deleteShowEleveParent", protect, DeleteEleve)
module.exports = router;
