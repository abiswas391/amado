const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us yur name.'],
    trim: true,
    minlength: 8,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'An user must have an email.'],
    unique: true,
    lowercase: true
    // validate: [validator.isEmail, 'Please provide a valid Email.'],
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'lead-guide', 'guide'],
    default: 'user'
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'The password you entered is not the same.'
    }
  },
  passwordChangedAt: Date,
  passwordResetExpires: Date,
  passwordResetToken: {
    type: String,
    default: undefined
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

// userSchema.pre('save', async function (next) {
//   const hashedPassword = await bcrypt.hash(this.password, 12);
//   this.password = hashedPassword;
//   this.passwordConfirm = undefined;
//   next();
// });

// userSchema.pre('validate', function (next) {
//   if (this.password !== this.passwordConfirm) {
//     this.invalidate('passwordConfirmation', 'enter the same password');
//   }
//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
