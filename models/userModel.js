const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    trim: true,
    maxlength: [40, 'Name must be less than or equal to 40 characters'],
    minlength: [3, 'Name must be more than or equal to 3 characters']
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: [true, 'Email already exists'],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Enter a valid email'] // This only works on create and save, so be carefull
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: 'Role is either: user, admin'
    },
    default: 'user'
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters long'],
    maxlength: [20, 'Password must be less than or equal to 20 characters'],
    trim: true,
    required: [true, 'Please provide a password'],
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // this works only on CREATE and SAVE
      validator: function(val) {
        return val === this.password;
      },
      message: 'Passwords do not match!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre(/^find/, async function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(tokenIssuedAt) {
  if (this.passwordChangedAt) {
    console.log(
      parseInt(this.passwordChangedAt.getTime() / 1000, 10),
      tokenIssuedAt
    );
    return (
      tokenIssuedAt < parseInt(this.passwordChangedAt.getTime() / 1000, 10)
    );
  }
  return false;
};

// what is the use of this method

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
User.syncIndexes(); // Sync indexes to ensure that the unique index on email is created
// This is important to ensure that the unique index on email is created

module.exports = User;
