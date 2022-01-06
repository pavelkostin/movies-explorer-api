const mongoose = require('mongoose');
const { isEmail } = require('validator');



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
    }
  },
  password: {
    type: String,
    required: true,
    /* select: false, */
},
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
    default: 'Имя по-умолчанию',
}
})

module.exports = mongoose.model('user', userSchema);