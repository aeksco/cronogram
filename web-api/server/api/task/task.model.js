const mongoose = require('mongoose')

// // // //

const Task = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true
  },
  dependencies: {
    type: [String],
    required: false,
    unique: false,
    default: []
  },
  script: {
    type: String,
    required: true,
    unique: false
  },
  cron: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: false,
    unique: false
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  },
  // Collection options
  {
    timestamps: {
      createdAt: 'createdOn',
      updatedAt: 'updatedOn'
  },
  versionKey: false
});

// // // //

// Specifying a virtual with a `ref` property is how you enable virtual population
Task.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true // Only return one User
});


// Same as above just as a method
Task.methods.getUser = function () {
  return mongoose.model('User').findById(this.user_id);
}


Task.set('toJSON', { getters: true, virtuals: true });

// // // //

module.exports = mongoose.model('Task', Task)
