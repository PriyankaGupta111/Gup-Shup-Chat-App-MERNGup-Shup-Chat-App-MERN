import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

export default dbConnect;
