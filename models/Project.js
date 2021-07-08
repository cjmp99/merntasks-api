const mongoose = require('mongoose');


const Project = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    create: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Project', Project)