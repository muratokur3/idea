import { Button, Fade } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAuthPage, setAuthItem } from "../../../redux/slices/UiSlice";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { loginClient } from "../../../redux/actions/AuthAction";
import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChance = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    dispatch(loginClient(formData));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  return (
    <div id="login-container" >
      <form onSubmit={login}>
        <h1
         style={{
          cursor: "pointer",
          marginTop: "10px",
          fontFamily: "monospace",
          color: "gray",
        }}>Giriş Yap</h1>

        <FormControl variant="filled" sx={{ width: "50%" }}>
          <InputLabel>Email</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            value={formData.email}
            onChange={handleInputChance}
            name="email"
            required
          />
        </FormControl>

        <FormControl variant="filled" sx={{ width: "50%" }}>
          <InputLabel htmlFor="filled-adornment-password">Şifre</InputLabel>
          <FilledInput
            sx={{ background: "none" }}
            value={formData.password}
            onChange={handleInputChance}
            name="password"
            required
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

        <Button type="submit" sx={{
          color: "white",
          border: "1px solid gray",
          borderRadius: "20px",
          padding: "5px 30px",
        }}>
          Giriş Yap
        </Button>
      </form>
      <Button
        className="close-login-page"
        onClick={() => dispatch(setAuthPage(false))}
        transitioncomponent={Fade}
      >
        X
      </Button>
      <a
      style={{
        cursor: "pointer",
        marginTop: "10px",
        fontSize:".6rem",
        fontFamily: "monospace",
        color: "white",
      }}
      onClick={() => dispatch(setAuthItem("register"))}>Kayıt ol</a>
    </div>
  );
};

export default Login;
