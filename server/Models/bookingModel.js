const { Schema, model } = require("mongoose");

// Core booking flow:
// pending -> accepted -> in_progress -> completed | cancelled
const bookingSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: Schema.Types.ObjectId, ref: "User" },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    scheduledAt: { type: Date, required: true },
    address: { type: String, required: true },
    note: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    priceQuoted: { type: Number },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

const Booking = model("Booking", bookingSchema);
module.exports = Booking;
