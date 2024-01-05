import { Button, Fade, TextField } from "@mui/material";
import "./scss/login.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLoginPage } from "../../../store/UiSlice";
import { useState } from "react";
import { setLogin, setUser } from "../../../store/AuthenticationSlice";
const Login = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = (e) => {
    e.preventDefault();
     const user=users.find((user) =>user.username === username && user.password === password)
       if (user)
        {
          localStorage.setItem("username", username);
          localStorage.setItem("token", username+"101010101");
          localStorage.setItem("isLogin", true);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(setLogin(true));
          dispatch(setUser(user));

          setUsername("");
          setPassword("");
         return dispatch(setLoginPage(false));

        }
         else
          {
         return alert("Kullanıcı adı veya şifre hatalı!");
        }
      }


  return (
    <div id="login-container">
      <div id="login-center-box">
        <form onSubmit={login} >
          <h1>Giriş Yap</h1>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="standard-basic"
            label="Kullanıcı Adı"
            variant="standard"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ color: "white" }}
            id="standard-basic"
            type="password"
            label="Şifre"
            variant="standard"
          />
          <Button
            variant="outlined"
            type="submit"
          >
            Giriş Yap
          </Button>
        </form>
        <Button
          className="close-login-page"
          onClick={() => dispatch(setLoginPage(false))}
          TransitionComponent={Fade}
          >
          X
        </Button>
      </div>
    </div>
  );
};

export default Login;
