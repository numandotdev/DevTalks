import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: false },
    content: { type: String, required: true },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
