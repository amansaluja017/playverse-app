import mongoose, { Document, models } from "mongoose"

export const video_dimentions = {
    height: 1920,
    width: 1080
} as const


export interface Ivideo {
    _id?: mongoose.Types.ObjectId,
    title: string,
    description: string,
    thumbnailUrl: string,
    videoUrl: string,
    controls: boolean,
    transformations?: {
        height: number,
        width: number,
        quality: number
    },
    user?: mongoose.Schema.Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date
};

const videoSchema = new mongoose.Schema<Ivideo>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        thumbnailUrl: {
            type: String,
            required: true
        },
        videoUrl: {
            type: String,
            required: true
        },
        controls: {
            type: Boolean,
            default: true
        },
        transformations: {
            height: {
                type: Number,
                default: video_dimentions.height
            },
            width: {
                type: Number,
                default: video_dimentions.width
            },
            quality: {
                type: Number,
                min: 1,
                max: 100
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Video = models?.Video || mongoose.model<Ivideo>("Video", videoSchema);