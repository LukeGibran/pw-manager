const validator = require('validator');
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
// const process = require('../../config/config');

const pwSchema = mongoose.Schema(
  {
    domain: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error('Email address is invalid!');
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(val) {
        if (val < 8) {
          throw new Error('Password must be atleast 8 characters!');
        }
      }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    }
  },
  {
    timestamps: true
  }
);

pwSchema.pre('save', function(next) {
  const pw = this;

  if (pw.isModified('password')) {
    pw.password = CryptoJS.AES.encrypt(pw.password, process.env.CIPHER_TEXT);
  }

  next();
});

const password = mongoose.model('password', pwSchema);

module.exports = password;
