const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const { ReadUser } = require('../Controllers/Read')
const { Read_Year } = require('../Controllers/Setting_Annee')
const { readOption } = require('../Controllers/Option')
const { ReadCoursSimple } = require('../Controllers/Cours')
const { ReadEleve, ReadInscrit } = require('../Controllers/Eleve')
const {
  ListeDesEleve,
  ListeParentEnseignant,
} = require('../Controllers/Parent')
const { ReadPeriode } = require('../Controllers/Periode')
const { readTitle } = require('../Controllers/TitreFrais')

//FIN NOUVELLE VERSION

router.get('/user', ReadUser)
router.get('/annee', protect, Read_Year)
router.get('/option', protect, readOption)
router.get('/cours', protect, ReadCoursSimple)
router.get('/eleveinfo', protect, ReadEleve)
router.get('/inscrit', protect, ReadInscrit)
router.get('/parentListeDesEleve/:id', ListeDesEleve)
router.get('/periode', protect, ReadPeriode)
router.get('/parent', protect, ListeParentEnseignant)
router.get("/titleFrais", protect, readTitle)

//FIN ETABLISSEMENT

module.exports = router
