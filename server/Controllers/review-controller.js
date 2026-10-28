const Review = require("../Models/reviewModel");
const Booking = require("../Models/bookingModel");

// POST /api/reviews
const createReview = async (req, res, next) => {
  try {
    const { booking: bookingId, rating, comment } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.customer.toString() !== req.userID.toString())
      return res.status(403).json({ message: "Only the customer can review" });
    if (booking.status !== "completed")
      return res.status(400).json({ message: "Can review only completed bookings" });
    if (!booking.provider) return res.status(400).json({ message: "No provider on booking" });

    const review = await Review.create({
      booking: bookingId,
      customer: req.userID,
      provider: booking.provider,
      rating,
      comment,
    });
    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Already reviewed" });
    next(err);
  }
};

// GET /api/reviews/provider/:id
const providerReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ provider: req.params.id })
      .populate("customer", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

module.exports = { createReview, providerReviews };
