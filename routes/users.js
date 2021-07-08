const { Router } = require('express')
const userController = require('../controllers/users.controller')
const { check } = require('express-validator')

const router = Router()

// api/users
router.post('/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'The password must have a minimum of 6 characters').isLength({ min: 6 })
    ],
    userController.createUser)

module.exports = router;