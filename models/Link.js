import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  category: { type: String, default: "Uncategorized" },
  // Using an array of strings is great for performance in Next.js
  tags: {
    type: [String],
    default: [],
    index: true, // Adding an index makes searching by tag much faster!
  },
  // Make sure this matches what you call it in your auth.js/queries
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// This prevents Mongoose from creating the model twice during hot-reloads
export default mongoose.models.Link || mongoose.model("Link", LinkSchema);
