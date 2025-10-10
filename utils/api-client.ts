import { Iuser } from "@/models/user.model";
import { Ivideo } from "@/models/video.model";

export type videoFormData = Omit<Ivideo, "_id">

export type userFormData = Omit<Iuser, "_id">

export type setPasswordFormData = {
    email: string,
    newPassword: string,
    confirmNewPassword: string
}

type fetchOptions = {
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
    body?: any,
    headers?: Record<string, string>
}

class ApiClient {
    private async fetch<T>(
        endpoint: string,
        options: fetchOptions = {}
    ): Promise<T> {
        const {method = "GET", body, headers = {}} = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

        const response = await fetch(`/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined
        })

        return response.json()
    }

    async createUser(userData: userFormData) {
        return this.fetch("/auth/register", {
            method: "POST",
            body: userData
        })
    }

    async getUser(email: string) {
        return this.fetch("/auth/forget-password", {
            method: "POST",
            body: email
        })
    }

    async setPassword(setPasswordData: setPasswordFormData) {
        return this.fetch("/auth/forget-password", {
            method: "PATCH",
            body: setPasswordData
        })
    }

    async sendOtp(email: string) {
        return this.fetch("/auth/send-otp", {
            method: "POST",
            body: email
        })
    }

    async getVideos() {
        return this.fetch("/videos")
    }

    async createVideo(videoData: videoFormData) {
        return this.fetch("/videos", {
            method: "POST",
            body: videoData
        })
    }
}

export const apiClient = new ApiClient();