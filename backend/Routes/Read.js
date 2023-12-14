const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const { readUser } = require('../Controllers/Read')
const { Read_Year } = require('../Controllers/Setting_Annee')
const { readOption } = require('../Controllers/Option')
const { ReadCoursSimple } = require('../Controllers/Cours')
const { ReadEleve, ReadInscrit } = require("../Controllers/Eleve")
const { ListeDesEleve } = require('../Controllers/Parent')

//FIN NOUVELLE VERSION


router.get('/user', readUser)
router.get('/annee', protect, Read_Year)
router.get('/option', protect, readOption)
router.get("/cours", protect, ReadCoursSimple)
router.get("/eleveinfo", protect, ReadEleve)
router.get('/inscrit', protect, ReadInscrit)
router.get("/parentListeDesEleve/:id", protect, ListeDesEleve)


//FIN ETABLISSEMENT

module.exports = router
