const jwt = require("jsonwebtoken");
const Customer = require("../Models/customerModel");
const ServiceProvider = require("../Models/serviceProviderModel");
const User = require("../Models/userModel");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    let userData = null;

    // New unified tokens carry userId / appRole
    if (payload.userId) {
      userData = await User.findById(payload.userId).select("+password");
      if (userData) {
        const safe = userData.toObject();
        delete safe.password;
        // normalize role names for old code
        safe.appRole = safe.role;
        if (safe.role === "provider") safe.role = "service_provider";
        req.user = safe;
        req.token = token;
        req.userID = safe._id;
        return next();
      }
    }

    // Legacy tokens: customerId / serviceProviderId / role
    if (payload.customerId || payload.role === "customer") {
      userData = await Customer.findOne({ email: payload.email }).select({ password: 0 });
    } else if (payload.serviceProviderId || payload.role === "service_provider") {
      userData = await ServiceProvider.findOne({ email: payload.email }).select({ password: 0 });
    } else if (payload.role === "admin") {
      userData =
        (await User.findOne({ email: payload.email })) ||
        (await Customer.findOne({ email: payload.email }).select({ password: 0 }));
    }

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    req.user = userData;
    req.token = token;
    req.userID = userData._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

module.exports = authMiddleware;
