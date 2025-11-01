import mongoose, { Schema, Document } from 'mongoose';

export type Role = 'admin' | 'user';

export interface IUser extends Document {
  email: string;
  password: string; // Hashed
  role: Role;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
