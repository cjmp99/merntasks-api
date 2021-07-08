const Project = require('../models/Project')
const Task = require('../models/Task')
const { validationResult } = require('express-validator')

exports.createTask = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { project } = req.body

        const validateProject = await Project.findById(project);

        if (!validateProject) {
            res.status(404).json({ msg: 'Project not found' })
        }

        if (validateProject.creator) {

            if (validateProject.creator.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'Not authorized' })
            }

            const task = new Task(req.body);
            await task.save()
            res.json({ task })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something went wrong' })
    }
}

exports.getTasks = async (req, res) => {
    try {
        const { project } = req.query

        const validateProject = await Project.findById(project);

        if (!validateProject) {
            res.status(404).json({ msg: 'Project not found' })
        }

        if (validateProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }

        const tasks = await Task.find({ project }).sort({ create: -1 });
        res.json({ tasks })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something went wrong' })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { project, name, state } = req.body

        let task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({ msg: 'Task not found' })
        }

        const validateProject = await Project.findById(project);

        if (!validateProject) {
            res.status(404).json({ msg: 'Project not found' })
        }

        if (validateProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }

        const newtask = {};
        newtask.name = name
        newtask.state = state

        task = await Task.findOneAndUpdate({ _id: req.params.id }, newtask, { new: true })
        res.json({ task })


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something went wrong' })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { project } = req.query

        let task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({ msg: 'Task not found' })
        }

        const validateProject = await Project.findById(project);

        if (!validateProject) {
            res.status(404).json({ msg: 'Project not found' })
        }

        if (validateProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }

        await Task.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Task removed successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something went wrong' })
    }
}