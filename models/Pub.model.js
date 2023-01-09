const { Schema, model } = require("mongoose");

const pubSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name of pub is required.'],
    },
    street: {
      type: String,
      required: [true, 'Street is required.']
    },
    city: {
      type: String,
      required: [true, 'City is required.']
    },
    state: {
      type: String,
      required: [true, 'State is required.']
    },
    postcode: {
      type: Number,
      required: [true, 'Postcode is required.']
    },
    image: {
      type: String,
    },
    longitude: {
      type: String,
      required: [true, 'Longitude is required.']
    },
    latitude: {
      type: String,
      required: [true, 'Latitude is required.']
    },
    websiteLink: {
      type: String,
      required: [true, 'Wesbite link is required.']
    },
    dateVerified: {
      type: String,
      required: [true, 'Date verified is required.']
    }
  },
  {
    timestamps: true
  }
);

const Pub = model("Pub", pubSchema);

module.exports = Pub;
