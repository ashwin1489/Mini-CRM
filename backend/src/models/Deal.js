import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  stage: { type: String, enum: ["new", "in-progress", "won", "lost"], default: "new" },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model("Deal", dealSchema);
