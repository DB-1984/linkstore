import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  category: { type: String, default: "Uncategorized" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

// This prevents Mongoose from creating the model twice during hot-reloads
export default mongoose.models.Link || mongoose.model("Link", LinkSchema);
