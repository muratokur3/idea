import axios from "axios";
import { setLoginedHashtags, setLogin, setUser } from "../slices/AuthSlice";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

//kullanıcı kayıt olurken kullanılır
const registerUser = (data) => async () => {

  try {
    await axios.post(`${apiUrl}/api/auth/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error.response.status === 400) {
      alert(error.response.data);
    } else {
      console.log(error);
    }
  }
};

//kullanıcı giriş yaparken kullanılır
const loginClient = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (response.status === 200) {
      localStorage.setItem("isLogin", true);
      localStorage.setItem("avatar", response.data.avatar);
      dispatch(setLogin(true));
      dispatch(setUser(response.data));
      dispatch(setLoginedHashtags(response.data.hashtags));
      alert("Giriş başarılı");
    } else alert("Kullanıcı adı veya şifre hatalı");
  } catch (error) {
    if (error.response.status === 401) {
      alert(error.response.data);
    }
  }
};

export {  registerUser, loginClient };
