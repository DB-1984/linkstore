import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  emailVerified: { type: Date, default: null },
  image: { type: String },
  // Custom fields you might want for LinkStore
  username: { type: String, unique: true, sparse: true },
  bio: { type: String, maxLength: 160 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
