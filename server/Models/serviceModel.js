const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
});

const Service = new model("Service", serviceSchema);

module.exports = Service;