import mongoose from "mongoose";

export const connectDB = async () => {
  return await mongoose.connect(process.env.DB_CONNECTION_URI);
};
