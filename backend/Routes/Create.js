const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')

const { login } = require('../Controllers/auth')

const { Add_Annee } = require('../Controllers/Setting_Annee')
const { addOption } = require('../Controllers/Option')
const { AddClasse } = require('../Controllers/Classe')
const { Cours } = require('../Controllers/Cours')
const { PremEnregistrement, Inscription } = require('../Controllers/Eleve')
const { AddParent } = require('../Controllers/Parent')

//PARAMETRES
router.post('/annee', protect, Add_Annee)
router.post('/option', protect, addOption)
router.post('/classe', protect, AddClasse)
router.post('/cours', protect, Cours)
router.post('/infoEleve', protect, PremEnregistrement)
router.post("/inscription", protect, Inscription)
router.post("/parent", AddParent)

//FIN TUTEUR
router.post('/login', login)

module.exports = router
