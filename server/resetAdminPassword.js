import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const result = await User.findOneAndUpdate(
      { email: "admin@example.com" },
      { password: hashedPassword },
      { new: true }
    );

    if (!result) {
      console.log("❌ Admin user not found");
    } else {
      console.log("✅ Admin password reset successfully");
      console.log("Updated at:", result.updatedAt);
    }

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

resetAdminPassword();
