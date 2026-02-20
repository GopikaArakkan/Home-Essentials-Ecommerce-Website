import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
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
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);



// 🔐 HASH PASSWORD BEFORE SAVING USER
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // 🔥 IMPORTANT
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});




// 🔑 MATCH ENTERED PASSWORD WITH HASHED PASSWORD
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



const User = mongoose.model("User", userSchema);

export default User;
