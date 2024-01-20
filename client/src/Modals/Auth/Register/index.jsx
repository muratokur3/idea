import { useDispatch } from "react-redux";
import { setAuthItem } from "../../../redux/slices/UiSlice";
import { Box, Button, Fade, Input, TextField } from "@mui/material";
import { useState } from "react";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { loginUserControl } from "../../../redux/actions/AuthenticationAction";
import "./register.scss";
const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    dispatch(loginUserControl(username, password));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = () => {
    event.preventDefault();
  };
  return (
    <div id="register-container">
      <form onSubmit={register}>
        <h1>Kaydol</h1>

        <Box sx={{ display: "flex", gap: "30px" }}>
        <FormControl variant="filled" sx={{ width: "50%" }}>
          <InputLabel>Ad</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl variant="filled" sx={{ width: "50%" }}>
          <InputLabel>Soyad</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        </Box>

        <FormControl variant="filled" sx={{ width: "100%" }}>
          <InputLabel>Kullanıcı adı</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
       
        <FormControl variant="filled" sx={{ width: "100%" }}>
          <InputLabel>Email</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl variant="filled" sx={{ width: "100%" }}>
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
      <a onClick={() => dispatch(setAuthItem("login"))}>Hemen Giriş Yap</a>

      </form>
    </div>
  );
};

export default Register;
