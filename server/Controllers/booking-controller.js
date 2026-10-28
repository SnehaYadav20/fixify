const Booking = require("../Models/bookingModel");

// POST /api/bookings  (customer)
const createBooking = async (req, res, next) => {
  try {
    const { service, scheduledAt, address, note } = req.body;
    const booking = await Booking.create({
      customer: req.userID,
      service,
      scheduledAt,
      address,
      note,
    });
    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    next(err);
  }
};

// GET /api/bookings/mine
const myBookings = async (req, res, next) => {
  try {
    const filter =
      req.user.appRole === "provider" || req.user.role === "service_provider"
        ? { $or: [{ provider: req.userID }, { provider: null, status: "pending" }] }
        : { customer: req.userID };
    const bookings = await Booking.find(filter)
      .populate("service")
      .populate("customer", "name email phone")
      .populate("provider", "name email phone jobType")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/bookings/:id/status  { status }
const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ["accepted", "in_progress", "completed", "cancelled"];
    if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const isCustomer = booking.customer.toString() === req.userID.toString();
    const isProvider =
      !booking.provider || booking.provider.toString() === req.userID.toString();
    const isAdmin = req.user.isAdmin;

    if (!isCustomer && !isProvider && !isAdmin)
      return res.status(403).json({ message: "Not allowed" });

    // provider claims the job on accept
    if (status === "accepted" && !booking.provider) booking.provider = req.userID;
    booking.status = status;
    await booking.save();
    res.status(200).json({ message: `Booking ${status}`, booking });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, myBookings, updateStatus };
