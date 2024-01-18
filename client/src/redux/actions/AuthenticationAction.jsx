import axios from "axios";
import { setLogin, setUser } from "../slices/AuthenticationSlice";
import { setLoginPage } from "../slices/UiSlice";

const loginUserControl =(username, password)=> async ( dispatch) => {
  const url = "http://localhost:3005";
  const response = await axios.get(`${url}/users`, {
    params: {
      username,
      password,
    },
  });
  if (response.data.length > 0) {
    localStorage.setItem("username", username);
    localStorage.setItem("userId", response.data[0].id);
    localStorage.setItem("token", username + "101010101");
    localStorage.setItem("isLogin", true);
    localStorage.setItem("user", JSON.stringify(response.data[0]));
    dispatch(setLogin(true));
    dispatch(setUser(response.data[0]));
    dispatch(setLoginPage(false));
  }
  else 
    alert("Kullanıcı adı veya şifre hatalı");
};

export { loginUserControl };
