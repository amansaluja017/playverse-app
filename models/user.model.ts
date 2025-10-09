import mongoose, { models } from "mongoose";
import bcrypt from "bcryptjs";


export interface Iuser {
    _id?: mongoose.Types.ObjectId,
    name: string,
    email: string,
    password: string,
    isVerified: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const userSchema = new mongoose.Schema<Iuser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }

    next();
});


export const User = models?.User || mongoose.model<Iuser>("User", userSchema);