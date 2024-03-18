import { sessionService } from "redux-react-session";
import axios from "../../../axiosConfig";
//kullanıcı kayıt olurken kullanılır
const registerUser = (data) => async () => {
  try {
    await axios.post(`auth/register`, data);
  } catch (error) {
    if (error.response.status === 400) {
      alert(error.response.data);
    } else {
      console.log(error);
    }
  }
};

//kullanıcı giriş yaparken kullanılır
const loginClient = async (data) => {
  try {
    const response = await axios.post(`auth/login`, data);
    if (response.status === 200) {
      await sessionService.saveSession({
        username: response.data.username,
      });
      await sessionService.saveUser(response.data);
    } else alert("Kullanıcı adı veya şifre hatalı");
  } catch (error) {
    if (error.response.status === 401) {
      alert(error.response.data);
    }
  }
};

export { registerUser, loginClient };
