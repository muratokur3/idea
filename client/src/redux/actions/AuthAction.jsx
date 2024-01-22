import axios from "axios";
import { setLogin, setUser } from "../slices/AuthSlice";
import { setAuthItem, setAuthPage } from "../slices/UiSlice";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const loginClient = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(setLogin(true));
      dispatch(setUser(response.data));
      dispatch(setAuthPage(false));
      alert("Giriş başarılı");
    } else alert("Kullanıcı adı veya şifre hatalı");
  } catch (error) {
    if (error.response.status === 401) {
      alert(error.response.data);
    }
  }
};

const registerUser = (data) => async (dispatch) => {

  try {
    await axios.post(`${apiUrl}/api/auth/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(setAuthItem("login"));
  } catch (error) {
    if (error.response.status === 400) {
      alert(error.response.data);
    } else {
      console.log(error);
    }
  }
};

export { loginClient, registerUser };
