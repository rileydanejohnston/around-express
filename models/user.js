const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => {
        return /\w{4,5}\S{3,}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  }
});