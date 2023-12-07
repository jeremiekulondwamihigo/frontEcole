const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')

const { login } = require('../Controllers/auth')


const multer = require('multer')
const { Add_Annee } = require('../Controllers/Setting_Annee')
const { addOption } = require('../Controllers/Option')
const { AddClasse } = require('../Controllers/Classe')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images/')
  },
  filename: (req, file, cb) => {
    const image = file.originalname.split('.')

    cb(null, `${Date.now()}.${image[1]}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)

    if (ext !== '.jpg' || ext !== '.png') {
      return cb(res.status(400).end('only jpg, png are allowed'), false)
    }
    cb(null, true)
  },
})
var upload = multer({ storage: storage })

//PARAMETRES
router.post("/annee", protect, Add_Annee)
router.post('/option', protect, addOption)
router.post('/classe', AddClasse)



//FIN TUTEUR
router.post('/login', login)

module.exports = router
