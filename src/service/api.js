import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL // backend
});

// interceptor → roda antes de TODA requisição
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const buscarServicos = () => api.get("/servicos");
export const buscarItens = () => api.get("/itens");

export default api;