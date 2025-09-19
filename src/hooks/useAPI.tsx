import axios from "axios";
import { appConsole } from "../utils";

const useAPI = () => {
  const API_BASE_URL = process.env.REACT_APP_BACK_API_HOST;
  const AI_API_URL = process.env.REACT_APP_AI_API_HOST;

  const newAxios = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
    withCredentials: true,
  });

  const newAIAxios = axios.create({
    baseURL: AI_API_URL,
    timeout: 60000,
    withCredentials: false,
  });

  newAxios.interceptors.response.use(
    (response) => {
      // 정상 응답 그대로 반환
      return response;
    },
    (error) => {
      // 반드시 에러를 다시 throw해야 이후 catch에서 처리 가능
      return Promise.reject(error);
    }
  );

  const api = {
    get: (url: string, data?: {}) => {
      console.log("🔍 [useAPI] GET 요청 URL:", API_BASE_URL + url);
      return newAxios.get(url, { params: data });
    },
    post: (url: string, data?: {}, config?: {}) =>
      newAxios.post(url, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        ...config,
      }),
    postWithJson: (url: string, data?: {}, config?: {}) =>
      newAxios.post(url, data, {
        headers: { "Content-Type": "application/json" },
        ...config,
      }),
    postWithMultiPart: (url: string, data?: {}, config?: {}) => {
      return newAxios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data", // axios가 자동으로 설정해주지만 명시해도 무방
        },
        ...config,
      });
    },
    put: (url: string, data?: {}, config?: {}) =>
      newAxios.put(url, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        ...config,
      }),
    putWithJson: (url: string, data?: {}, config?: {}) =>
      newAxios.put(url, data, {
        headers: { "Content-Type": "application/json" },
        ...config,
      }),
    // Lease 코드 추가
    postWithFormData: (url: string, data?: FormData, config?: {}) =>
      newAxios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
        ...config,
      }),
    putWithFormData: (url: string, data?: FormData, config?: {}) =>
      newAxios.put(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
        ...config,
      }),
    delete: (url: string, data?: {}, config?: {}) =>
      newAxios.delete(url, { data: data, ...config }),
    isApiError: (error: any) => axios.isAxiosError(error),
  };

  const aiApi = {
    get: <T = any>(url: string, data?: {}) =>
      newAIAxios.get<T>(url, {
        params: data,
        paramsSerializer: { indexes: null },
      }),
    post: <T = any>(url: string, data?: {}, config?: {}) =>
      newAIAxios.post<T>(url, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        ...config,
      }),
    postWithJson: <T = any>(url: string, data?: {}, config?: {}) =>
      newAIAxios.post<T>(url, data, {
        headers: { "Content-Type": "application/json" },
        ...config,
      }),
    postWithMultiPart: <T = any>(url: string, data?: {}, config?: {}) => {
      return newAIAxios.post<T>(url, data, {
        headers: {
          "Content-Type": "multipart/form-data", // axios가 자동으로 설정해주지만 명시해도 무방
        },
        ...config,
      });
    },
    put: <T = any>(url: string, data?: {}, config?: {}) =>
      newAIAxios.put<T>(url, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        ...config,
      }),
    putWithJson: <T = any>(url: string, data?: {}, config?: {}) =>
      newAIAxios.put<T>(url, data, {
        headers: { "Content-Type": "application/json" },
        ...config,
      }),
    delete: <T = any>(url: string, data: {}, config?: {}) =>
      newAIAxios.delete<T>(url, { params: data, ...config }),
    isApiError: (error: any) => axios.isAxiosError(error),
  };

  return { api, aiApi };
};

export default useAPI;
