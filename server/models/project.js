const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    deadline: {type: String, required: true},
    budget: {type: String, required: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String, 
        enum: ['Done', 'Active'],
        default: 'Active'
    }
});

mongoose.model('Project', ProjectSchema);