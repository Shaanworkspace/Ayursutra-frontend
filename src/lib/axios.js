import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_GATEWAY_BASE_URL,
    withCredentials: true,
});
export default api;
