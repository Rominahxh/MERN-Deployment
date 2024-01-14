const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: [5, "Name should be more than 5 characteristics"],
      maxlength: [30, "Name should be less than 30 characteristics"],
      required: [true, "This field is required"],
    },
    imgURL: {
      type: String,
      required: [true, "This field is required"],
    },
    phrase: {
      type: String,
      minlength: [5, "Name should be more than 5 characteristics"],
      required: [true, "This field is required"],
    },
    position: {
      type: String,
      required: [true, "This field is required"],
    },
    treasures: {
      type: Number,
      required: [true, "This field is required"],
    },
    pegleg: {
      type: Boolean,
      default: "true",
    },
    eyepatch: {
      type: Boolean,
      default: "true",
    },
    hookhand: {
      type: Boolean,
      default: "false",
      validate: {
      validator: function(value) {
        return !value; 
      },
      message: 'Hookhand cannot be true',
    },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Pirate", PirateSchema);
