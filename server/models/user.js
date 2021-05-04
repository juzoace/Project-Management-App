const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
// const Task = require("./project");
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    name: { type: String, required: true },
    // username: { type: String, required: true, trim: true, lowercase: true},
    email: { type: String, required: true },
    hash: String,
    salt: String,
    projects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }]
});

// UserSchema.plugin(uniqueValidator);
mongoose.model('User', UserSchema);