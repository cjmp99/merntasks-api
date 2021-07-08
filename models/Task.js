const mongoose = require('mongoose');

const Task = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    state: {
        type: Boolean,
        default: false
    },
    create: {
        type: Date,
        default: Date.now()
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
})

module.exports = mongoose.model('Task', Task)