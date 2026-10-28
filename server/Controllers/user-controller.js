const User = require("../Models/userModel");

// POST /api/v2/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role, aadhar, jobType } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const user = await User.create({ name, email, phone, password, role, aadhar, jobType });
    const token = user.generateToken();
    const safe = user.toObject();
    delete safe.password;
    res.status(201).json({ message: "Registration successful", token, user: safe });
  } catch (err) {
    next(err);
  }
};

// POST /api/v2/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });
    const token = user.generateToken();
    const safe = user.toObject();
    delete safe.password;
    res.status(200).json({ message: "Login successful", token, user: safe });
  } catch (err) {
    next(err);
  }
};

// GET /api/v2/auth/me
const me = async (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = { register, login, me };
