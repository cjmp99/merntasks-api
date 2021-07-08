const express = require('express')
const router = express.Router();
const projectsController = require('../controllers/projects.controller')
const auth = require('../middleware/auth')
const { check } = require('express-validator')


router.post('/',
    auth,
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    projectsController.createProject)

router.get('/',
    auth,
    projectsController.getProjects)

router.put('/:id',
    auth,
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    projectsController.updateProject)

router.delete('/:id',
    auth,
    projectsController.deleteProject)

module.exports = router;