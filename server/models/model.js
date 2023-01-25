const mongoose = require('mongoose')

const Student = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { collection: 'student' }
)

const model = mongoose.model('Student', Student)
module.exports = model
