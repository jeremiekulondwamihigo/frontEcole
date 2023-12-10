const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const { readUser } = require('../Controllers/Read')
const { Read_Year } = require('../Controllers/Setting_Annee')
const { readOption } = require('../Controllers/Option')
const { ReadCoursSimple } = require('../Controllers/Cours')
const { readEleve } = require("../Controllers/Eleve")

//FIN NOUVELLE VERSION


router.get('/user', readUser)
router.get('/annee', protect, Read_Year)
router.get('/option', protect, readOption)
router.get("/cours", ReadCoursSimple)
router.get("/eleveinfo", readEleve)


//FIN ETABLISSEMENT

module.exports = router
