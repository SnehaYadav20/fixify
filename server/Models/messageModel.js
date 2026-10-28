const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, maxlength: 2000 },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);
module.exports = Message;
