import mongoose, { Schema, Document } from 'mongoose';

// Define the user schema
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create the model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
