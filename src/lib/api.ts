import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expires
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/register", data);

export const loginUser = (data: {
  email: string;
  password: string;
}) => api.post("/login", data);

export const getPlans = () => api.get("/plans");
export const subscribePlan = (planId: string) =>
  api.post(`/subscribe/${planId}`);

export const getMySubscription = () =>
  api.get("/my-subscription");
export const getAllSubscriptions = () =>
  api.get("/admin/all-subscriptions");


export default api;
