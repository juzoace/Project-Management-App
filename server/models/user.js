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
    }],
    // status: {
    //     type: String, 
    //     enum: ['Pending', 'Active'],
    //     default: 'Pending'
    //   },
      // confirmationCode: { 
      //   type: String, 
      //   unique: true },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
});

// UserSchema.plugin(uniqueValidator);
mongoose.model('User', UserSchema);