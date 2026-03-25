// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  emailVerified: { type: Date, default: null },
  image: { type: String },
  username: { type: String, unique: true, sparse: true },
  bio: { type: String, maxLength: 160 },
  createdAt: { type: Date, default: Date.now },
  // Reset fields for the 'Forgot Password' flow
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// User enters email.
// You save the token to resetPasswordToken.
// You send an email with a link like /api/auth/callback/credentials?token=xyz.
// When they click it, you log them in and clear those fields.

// Encrypt password using bcrypt before saving
UserSchema.pre("save", async function () {
  // 1. If the password isn't being touched, just exit the function
  if (!this.isModified("password")) {
    return;
  }

  // 2. Hash the password
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // No need to call next() here if using async/await in newer Mongoose
  } catch (error) {
    throw error; // Mongoose will catch this and abort the save
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
