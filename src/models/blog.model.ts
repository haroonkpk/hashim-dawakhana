  import mongoose from "mongoose";

  const blogSchema = new mongoose.Schema(
    {
      slug: { type: String, required: true},
      title: { type: String, required: true, unique: true },
      image: { type: String },
      category: { type: String },
      author: { type: String },
      date: { type: Date, default: Date.now },
      blocks: [
        {
          type: { type: String }, 
          // "heading" | "paragraph" | "image" | "table"
          content: { type: mongoose.Schema.Types.Mixed},
        },
      ],
    },
    { timestamps: true }
  );

  export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
