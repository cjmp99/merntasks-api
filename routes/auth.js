const { Router } = require('express')
const { check } = require('express-validator')
const authController = require('../controllers/auth.controller')
const auth = require('../middleware/auth')

const router = Router()

// api/auth
router.post('/', authController.authenticationUser)

router.get('/', auth, authController.userAuthenticated)

module.exports = router;