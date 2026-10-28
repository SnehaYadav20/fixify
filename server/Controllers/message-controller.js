const Message = require("../Models/messageModel");
const Booking = require("../Models/bookingModel");

// GET /api/messages/:bookingId
const listMessages = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    const allowed =
      booking.customer.toString() === req.userID.toString() ||
      (booking.provider && booking.provider.toString() === req.userID.toString()) ||
      req.user.isAdmin;
    if (!allowed) return res.status(403).json({ message: "Not allowed" });
    const msgs = await Message.find({ booking: req.params.bookingId })
      .populate("sender", "name role")
      .sort({ createdAt: 1 });
    res.status(200).json(msgs);
  } catch (err) {
    next(err);
  }
};

// POST /api/messages/:bookingId
const sendMessage = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ message: "Message is empty" });
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    const msg = await Message.create({ booking: booking._id, sender: req.userID, text: text.trim() });
    res.status(201).json({ message: "Sent", data: msg });
  } catch (err) {
    next(err);
  }
};

module.exports = { listMessages, sendMessage };
