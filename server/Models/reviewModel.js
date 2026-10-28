const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, maxlength: 1000 },
  },
  { timestamps: true }
);

reviewSchema.index({ booking: 1 }, { unique: true });

const Review = model("Review", reviewSchema);
module.exports = Review;
