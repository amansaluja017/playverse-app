import mongoose, { models } from "mongoose";
import bcrypt from "bcryptjs";

export interface Iuser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  isVerified: boolean;
  avatar?: string;
  watchHistory?: Array<mongoose.Types.ObjectId>;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<Iuser>(
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
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatar: {
      type: String,
    },
    watchHistory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Video",
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export const User = models?.User || mongoose.model<Iuser>("User", userSchema);
