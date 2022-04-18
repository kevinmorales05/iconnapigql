const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: false,
  },
  lastName: {
    type: String,
    required: true,
    trim: false,
  },
  birthday: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    required: false,
    trim: false,
  },
  telephone: {
    type: String,
    required: false,
    trim: true,
  },
  gender: {
    type: String,
    required: false,
  },
  privacy: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: Boolean,
    required: false,
    default: true,
  },
  address: {
    type: String,
    required: false,
  },
  latitude: {
    type: Number,
    required: false,
    default: null
  },
  longitude:{
    type: Number,
    required: false,
    default: null
  }
});

module.exports = mongoose.model("User", UserSchema);
