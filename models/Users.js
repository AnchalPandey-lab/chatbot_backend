import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  designation: {
    type: String,
    required: true,
    enum: [
      "super admin",
      "senior engineer",
      "junior engineer",
      "temporary employee",
    ],
  },
},
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
