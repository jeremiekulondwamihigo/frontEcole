const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')

const { login } = require('../Controllers/auth')

const { Add_Annee } = require('../Controllers/Setting_Annee')
const { addOption, readOption } = require('../Controllers/Option')
const { AddClasse } = require('../Controllers/Classe')
const { Cours, ReadCoursSimple } = require('../Controllers/Cours')
const { PremEnregistrement, Inscription } = require('../Controllers/Eleve')
const { AddParent, ListeParentEnseignant } = require('../Controllers/Parent')
const { AddPeriode } = require('../Controllers/Periode')
const {
  AddTitreFrais,
  AddFrais,
  readTitle,
} = require('../Controllers/TitreFrais')

//PARAMETRES
router.post('/annee', protect, Add_Annee)
router.post('/option', protect, addOption, readOption)
router.post('/classe', protect, AddClasse)
router.post('/cours', protect, Cours, ReadCoursSimple)
router.post('/infoEleve', protect, PremEnregistrement)
router.post('/inscription', protect, Inscription)
router.post('/parent', protect, AddParent, ListeParentEnseignant)
router.post('/periode', protect, AddPeriode)
router.post('/titreFrais', protect, AddTitreFrais, readTitle)
router.post('/frais', protect, AddFrais, readTitle)

//FIN TUTEUR
router.post('/login', login)

module.exports = router
