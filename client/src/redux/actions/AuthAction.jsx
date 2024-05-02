import { sessionService } from "redux-react-session";
import axios from "../../../axiosConfig";
//kullanıcı kayıt olurken kullanılır
const loggined = async (userData) => {
  await sessionService.saveSession({
    username: await userData.username,
  });
  await sessionService.saveUser(userData);
};

const activeAccount = async (id, data) => {
  const response = await axios.put(`users/account/activate/${id}`);
  if (response.status === 200) {
    try {
      const response = await axios.post(`auth/login`, data);
      if (response.status === 200) {
        loggined(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const registerUser = (data) => async () => {
  try {
    const response = await axios.post(`auth/register`, data);
    if (response.status === 201) {
      loggined(response.data);
    }
  } catch (error) {
    if (error.response.status === 400) {
      alert(error.response.data);
    } else {
      console.log(error);
    }
  }
};

//kullanıcı giriş işlemi.
const loginClient = (data) => async () => {
  try {
    const response = await axios.post(`auth/login`, data);
    if (response.status === 200) {
      loggined(response.data);
    }
     else if (
      response.status === 202 &&
      window.confirm(response.data.message)
    ) {
      activeAccount(response.data.userId, data);
    }
  } catch (error) {
    if (error.response.status === 401) {
      alert(error.response.data);
    } else {
      console.log(error);
    }
  }
};

export { registerUser, loginClient };
