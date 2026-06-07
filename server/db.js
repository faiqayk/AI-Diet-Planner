import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("❌ MongoDB Error:", error);

    // ❌ DO NOT CRASH SERVER
    console.log("⚠️ Server will continue without DB");
  }
};

export default connectDB;