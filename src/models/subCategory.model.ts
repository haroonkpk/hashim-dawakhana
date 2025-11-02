import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  MainCategory?: mongoose.Types.ObjectId | null;
  createdAt: Date;
}

const subCategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    MainCategory: { type: Schema.Types.ObjectId, ref: "MainCategory" },
  },
  { timestamps: true }
);

export default mongoose.models.SubCategory ||
  mongoose.model<ICategory>("SubCategory", subCategorySchema);

