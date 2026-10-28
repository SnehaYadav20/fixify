require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();

// Legacy routers (kept for compatibility)
const authRouter = require("./Router/auth-route");
const contactRoute = require("./Router/contact-route");
const serviceRoute = require("./Router/service-route");
const adminRoute = require("./Router/admin-route");

// New real-version routers
const userRoute = require("./Router/user-route");
const bookingRoute = require("./Router/booking-route");
const reviewRoute = require("./Router/review-route");
const messageRoute = require("./Router/message-route");

const connectDb = require("./utils/db");
const errorMiddleware = require("./Middleware/error-middleware");

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const corsOptions = {
  origin: CLIENT_URL.split(",").map(s => s.trim()),
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/api/health", (req, res) => res.status(200).json({ ok: true, version: "2.0.0" }));

// Legacy
app.use('/api/auth', authRouter);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);
app.use('/api/admin', adminRoute);

// v2 unified + real features
app.use('/api/v2/auth', userRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/messages', messageRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Fixify server v2 running on :${PORT}`);
  });
});
