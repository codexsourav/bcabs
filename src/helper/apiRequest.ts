import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { StorageKEY, getLocalStorageData } from './storageKeys';

export interface IApiError {
    message: string;
    status: number;
    data: any;
}

export class ApiError extends Error {
    status: number;
    data: any;

    constructor(message: string, status: number, data: any) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

export interface ApiResponse {
    status: number;
    message?: string;
}

export const baseUrl = "http://localhost:8002";
export const apiRequest = async <RES>({ method = "GET", path, data, isAdmin = false }: { isAdmin?: boolean; path: string, method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", data?: any }) => {
    try {
        const config: AxiosRequestConfig<any> = {
            baseURL: baseUrl,
            url: path,
            method: method,
            data: data || {},
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAccessToken(isAdmin),
            },
        };
        const response = await axios.request<RES>(config);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const status = axiosError.response?.status || 500;
            const responseData: any = axiosError.response?.data;
            const errorMessage = responseData?.message || error.toString();
            toast.error(errorMessage);
            throw new ApiError("API request failed", status, responseData);
        } else {
            console.error("Non-Axios error:", (error as Error).message);
            toast.error((error as Error).message || "Unknown Error");
            throw new ApiError("API request failed", 502, null);
        }
    }
};


export const uploadImage = async (imageFile: File): Promise<AxiosResponse> => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const config: AxiosRequestConfig<any> = {
            baseURL: baseUrl,
            url: '/api/upload',
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': getAccessToken(false),
            },
        };

        const response = await axios.request(config);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const status = axiosError.response?.status || 500;
            const responseData: any = axiosError.response?.data;
            const errorMessage = responseData?.message || error.toString();
            toast.error(errorMessage);
            throw new ApiError("Image upload failed", status, responseData);
        } else {
            console.error("Non-Axios error:", (error as Error).message);
            toast.error((error as Error).message || "Unknown Error");
            throw new ApiError("Image upload failed", 502, null);
        }
    }
};



type ErrorCallback = (error: Error) => void;

export const withErrorHandling = (callback: () => Promise<void>, errorCallback?: ErrorCallback) => async () => {
    try {
        await callback();
    } catch (error: any) {
        if (typeof errorCallback === 'function') {
            errorCallback(error);
        } else {
            console.log("API Error:", error);
        }
    }
};
const getAccessToken = (admin: boolean) => {
    return getLocalStorageData(admin ? StorageKEY.admin : StorageKEY.auth) || "";
};
