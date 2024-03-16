import { sessionService } from "redux-react-session";
import axios from "../../../axiosConfig";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
//kullanıcı kayıt olurken kullanılır
const registerUser = (data) => async () => {
  try {
    await axios.post(`${apiUrl}/api/auth/register`, data);
  } catch (error) {
    if (error.response.status === 400) {
      alert(error.response.data);
    } else {
      console.log(error);
    }
  }
};

//kullanıcı giriş yaparken kullanılır
const loginClient = (data) => async () => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/login`, data);
    if (response.status === 200) {

      await sessionService.saveSession({username: response.data.username});
      await sessionService.saveUser(response.data);
      
      alert("Giriş başarılı");
    } else alert("Kullanıcı adı veya şifre hatalı");
  } catch (error) {
    if (error.response.status === 401) {
      alert(error.response.data);
    }
  }
};

export { registerUser, loginClient };
