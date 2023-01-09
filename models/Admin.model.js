const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name of pub is required.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
  }
},
  {
    timestamps: true
  }
);

const Admin = model("Admin", adminSchema);

module.exports = Admin;
