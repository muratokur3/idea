import axios from "axios";
import { sessionService } from "redux-react-session";
const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const handleLogout = async () => {
  try {
    sessionService.invalidateSession();
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log(error);
      // 401 hatası alındığında oturumu sonlandırma eylemini çağır
      alert("Oturumunuz sonlandırıldı. Lütfen tekrar giriş yapınız.");
      handleLogout();
    }
    return Promise.reject(error);
  }
);

export default instance;
