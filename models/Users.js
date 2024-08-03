import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  First_Name: { type: String, required: true },
  Last_Name: { type: String, required: true },
  Role: { type: String, required: true },
  District: { type: String, required: true },
  Institution_Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

export default User;
