const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Unified user for the real version:
// role = customer | provider | admin
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["customer", "provider", "admin"],
      default: "customer",
      required: true,
    },
    // provider-only fields
    aadhar: { type: String, trim: true },
    jobType: { type: String, trim: true },
    isVerifiedProvider: { type: Boolean, default: false },
    // shared
    isAdmin: { type: Boolean, default: false },
    avatar: { type: String },
  },
  { timestamps: true }
);

// Hash password only when modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      userId: this._id.toString(),
      email: this.email,
      role: this.role === "provider" ? "service_provider" : this.role,
      appRole: this.role,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
