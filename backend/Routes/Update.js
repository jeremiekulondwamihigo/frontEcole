const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const { Modificate_Year } = require('../Controllers/Setting_Annee')
const { updateOption } = require('../Controllers/Option')

router.put('/annee/:id', protect, Modificate_Year)
router.put("/option", protect, updateOption)

module.exports = router
