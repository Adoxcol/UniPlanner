import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for a User
export interface IUser extends Document {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  university?: string;
  major?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the User model
const UserSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "",
    },
    university: {
      type: String,
      default: null,
    },
    major: {
      type: String,
      default: null,
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

// Define the User model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
