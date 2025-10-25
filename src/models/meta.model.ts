import mongoose from "mongoose";

const metaSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Meta || mongoose.model("Meta", metaSchema);
