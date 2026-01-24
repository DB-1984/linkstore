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

// Encrypt password using bcrypt before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
