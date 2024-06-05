import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

export default class BaseService<T> {

  public readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      // You can add your custom headers here
      // headers: { 'Content-Type': 'application/json' },
    });

    // Set the INTERCEPTORS here if you need to handle tokens or headers
  }

  public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.get<T>(url, config);
  }

  public post(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.post<T>(url, data, config);
  }

  public put(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.put<T>(url, data, config);
  }

  public delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.delete<T>(url, config);
  }
}
