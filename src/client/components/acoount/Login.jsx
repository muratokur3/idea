import { Button, Fade } from "@mui/material";
import "./scss/login.scss";
import { useDispatch } from "react-redux";
import { setLoginPage } from "../../redux/slices/UiSlice";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { loginUserControl } from "../../redux/actions/AuthenticationAction";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    dispatch(loginUserControl(username, password));
   
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = () => {
    event.preventDefault();
  };
  return (
    <div id="login-container">
      <div id="login-center-box">
        <form onSubmit={login}>
          <h1>Giriş Yap</h1>

          <FormControl variant="filled" sx={{ width: "50%" }}>
            <InputLabel>Kullanıcı adı</InputLabel>
            <FilledInput
              sx={{ background: "none", width: "100%" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl variant="filled" sx={{ width: "50%" }}>
            <InputLabel htmlFor="filled-adornment-password">Şifre</InputLabel>
            <FilledInput
              sx={{ background: "none" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button variant="outlined" type="submit">
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
