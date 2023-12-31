const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')

const { login } = require('../Controllers/auth')

const { Add_Annee } = require('../Controllers/Setting_Annee')
const { addOption, readOption } = require('../Controllers/Option')
const { AddClasse } = require('../Controllers/Classe')
const { Cours, ReadCoursSimple } = require('../Controllers/Cours')
const { PremEnregistrement, Inscription, ReadInscrit } = require('../Controllers/Eleve')
const { AddParent, ListeParentEnseignant } = require('../Controllers/Parent')
const { AddPeriode } = require('../Controllers/Periode')
const {
  AddTitreFrais,
  AddFrais,
  readTitle,
} = require('../Controllers/TitreFrais')
const {Payement, readOnePayment} = require('../Controllers/Payement')
const { AddRecouvrement, readSetRecouvrement } = require('../Controllers/SetRecouvrement')

//PARAMETRES
router.post('/annee', protect, Add_Annee)
router.post('/option', protect, addOption, readOption)
router.post('/classe', protect, AddClasse)
router.post('/cours', protect, Cours, ReadCoursSimple)
router.post('/infoEleve', protect, PremEnregistrement)
router.post('/inscription', protect, Inscription, ReadInscrit)
router.post('/parent', protect, AddParent, ListeParentEnseignant)
router.post('/periode', protect, AddPeriode)
//Finance
router.post('/titreFrais', protect, AddTitreFrais, readTitle)
router.post('/frais', protect, AddFrais, readTitle)
router.post("/payement", Payement, readOnePayment)
router.post("/setRecouvrement", AddRecouvrement, readSetRecouvrement)

//FIN TUTEUR
router.post('/login', login)

module.exports = router
