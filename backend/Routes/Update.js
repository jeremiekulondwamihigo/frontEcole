const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const { Modificate_Year } = require('../Controllers/Setting_Annee')
const { updateOption, readOption } = require('../Controllers/Option')
const { UpdateEleve, UpdateEleveImage, ReadInscrit, UpdateEleveInscrit } = require('../Controllers/Eleve')
const {
  AffecterEleve,
  InfoEleve,
  ListeParentEnseignant,
  updateParent,
} = require('../Controllers/Parent')
const { ModifierCours, ReadCoursSimple } = require('../Controllers/Cours')
const { updateClasse } = require('../Controllers/Classe')
const { updateRecouvrement, readSetRecouvrement } = require('../Controllers/SetRecouvrement')

router.put('/annee/:id', protect, Modificate_Year)
router.put('/option', protect, updateOption)
router.put('/infoEleve', protect, UpdateEleve)
router.put('/infoEleveWeb', protect, UpdateEleveImage)
router.put('/parentEleve', protect, AffecterEleve)
router.put('/parentUpdateEleve', protect, InfoEleve, ReadInscrit)
router.put('/cours', protect, ModifierCours, ReadCoursSimple)
router.put('/parent', protect, updateParent, ListeParentEnseignant)
router.put('/classe', protect, updateClasse, readOption)
router.put("/eleveInscrit", protect, UpdateEleveInscrit, ReadInscrit)
router.put("/updateRecouvrement", updateRecouvrement, readSetRecouvrement)

module.exports = router
