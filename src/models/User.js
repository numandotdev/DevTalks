import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        require: true,
      },
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        require: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
