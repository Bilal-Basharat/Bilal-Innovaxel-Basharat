import axios from "axios";

const ErrorMessages = {
    400: "Bad Request",
    404: "Resource or page not found",
    500: "Internal Server Error",
}

export const BaseURL = import.meta.env.VITE_APP_URL;

export const HttpService = axios.create({
    baseURL: BaseURL || "http://localhost:8000",
    
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

HttpService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

HttpService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
 
    if (status === 400) {
      return Promise.reject(ErrorMessages[status] || "Bad Request");
    }
    if(status === 404){
      return Promise.reject(ErrorMessages[status] || "Resource or page not found");
    }
    if(status === 500){
      return Promise.reject(ErrorMessages[status] || "Internal Server Error");
    }
    return Promise.reject(error);
  }
);