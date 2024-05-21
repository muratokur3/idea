import axios from "axios";
import { sessionService } from "redux-react-session";
const baseURL = import.meta.env.VITE_API_BASE_URL;
const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const handleLogout = async () => {
  try {
    const response = await instance("auth/logout");
    if (response.status === 200) {
      sessionService.invalidateSession();
      window.localStorage.clear();
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
};

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 401 hatası alındığında oturumu sonlandırma eylemini çağır
      handleLogout();
      alert(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default instance;
