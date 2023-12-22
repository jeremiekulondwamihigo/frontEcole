const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const { Modificate_Year } = require('../Controllers/Setting_Annee')
const { updateOption, readOption } = require('../Controllers/Option')
const { UpdateEleve } = require('../Controllers/Eleve')
const {
  AffecterEleve,
  InfoEleve,
  ListeParentEnseignant,
  updateParent,
} = require('../Controllers/Parent')
const { ModifierCours, ReadCoursSimple } = require('../Controllers/Cours')
const { updateClasse } = require('../Controllers/Classe')

router.put('/annee/:id', protect, Modificate_Year)
router.put('/option', protect, updateOption)
router.put('/infoEleve', protect, UpdateEleve)
router.put('/parentEleve', protect, AffecterEleve)
router.put('/parentUpdateEleve', protect, InfoEleve)
router.put('/cours', protect, ModifierCours, ReadCoursSimple)
router.put('/parent', protect, updateParent, ListeParentEnseignant)
router.put('/classe', protect, updateClasse, readOption)

module.exports = router
