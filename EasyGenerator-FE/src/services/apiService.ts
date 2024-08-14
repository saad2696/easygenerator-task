
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { environment } from '../enviorment/enviorment';
import { getAuth } from 'firebase/auth';

class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = environment.api.baseUrl;
        this.initializeInterceptors();
    }

    private initializeInterceptors() {
        axios.interceptors.request.use(
            async (config) => {
                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    const token = await user.getIdToken();
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    private getHeaders(contentType: string = 'application/json'): { [key: string]: string } {
        return {
            'Content-Type': contentType,
        };
    }
    private handleResponse<T>(response: AxiosResponse<T>): T {
        return response.data;
    }

    public get<T>(url: string, params?: any): Promise<T> {
        const config: AxiosRequestConfig = {
            headers: this.getHeaders(),
            params,
        };

        return axios.get<T>(`${this.baseUrl}${url}`, config).then(this.handleResponse);
    }

    public post<T>(url: string, body: any): Promise<T> {
        const config: AxiosRequestConfig = {
            headers: this.getHeaders(),
        };

        return axios.post<T>(`${this.baseUrl}${url}`, body, config).then(this.handleResponse);
    }


    public patch<T>(url: string, body: any): Promise<T> {
        const config: AxiosRequestConfig = {
            headers: this.getHeaders(),
        };

        return axios.patch<T>(`${this.baseUrl}${url}`, body, config).then(this.handleResponse);
    }

    public put<T>(url: string, body: any): Promise<T> {
        const config: AxiosRequestConfig = {
            headers: this.getHeaders(),
        };

        return axios.put<T>(`${this.baseUrl}${url}`, body, config).then(this.handleResponse);
    }

    public delete<T>(url: string): Promise<T> {
        const config: AxiosRequestConfig = {
            headers: this.getHeaders(),
        };

        return axios.delete<T>(`${this.baseUrl}${url}`, config).then(this.handleResponse);
    }

    public getMockUrl<T>(url: string): Promise<T> {
        const config: AxiosRequestConfig = {
            headers: this.getHeaders(),
        };

        return axios.get<T>(`${this.baseUrl}${url}`, config).then(this.handleResponse);
    }
}

const apiService = new ApiService();
export default apiService;