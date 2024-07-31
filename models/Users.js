import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  designation: { type: String,required: true, enum: ['Super admin', 'Temporary employee', 'Junior engineer'] },
});

const User = mongoose.model('User', UserSchema);

export default User;
