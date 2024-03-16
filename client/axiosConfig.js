import axios from "axios";
import { sessionService } from "redux-react-session";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const handleLogout = async () => {
  try {
    axios.get(`${apiUrl}/api/auth/logout`);
    await sessionService.deleteSession();
    await sessionService.deleteUser();
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // 401 hatası alındığında oturumu sonlandırma eylemini çağır
      handleLogout();
      alert("Oturumunuz sonlandırıldı. Lütfen tekrar giriş yapınız.");
    } else alert("sorun yok");
    return Promise.reject(error);
  }
);

export default instance;
