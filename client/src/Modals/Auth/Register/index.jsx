import { useDispatch } from "react-redux";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { registerUser } from "../../../redux/actions/AuthAction";
import { setAuthItem } from "../../../redux/slices/UiSlice";
import "./register.scss";
const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });
  const register = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const handleInputChance = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div id="register-container">
      <form onSubmit={register}>
      <h1
         style={{
          cursor: "pointer",
          marginTop: "10px",
          fontFamily: "monospace",
          color: "gray",
        }}>Kayıt ol</h1>
        <Box sx={{ display: "flex", gap: "30px" }}>
          <FormControl variant="standard" sx={{ width: "50%" }}>
            <InputLabel>Ad</InputLabel>
            <FilledInput
              sx={{ background: "none", width: "100%" }}
              value={formData.name}
              onChange={handleInputChance}
              name="name"
              required
            />
          </FormControl>

          <FormControl variant="filled" sx={{ width: "50%" }}>
            <InputLabel>Soyad</InputLabel>
            <FilledInput
              sx={{ background: "none", width: "100%" }}
              value={formData.surname}
              onChange={handleInputChance}
              name="surname"
              required
            />
          </FormControl>
        </Box>

        <FormControl variant="filled" sx={{ width: "100%" }}>
          <InputLabel>Kullanıcı adı</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            value={formData.username}
            onChange={handleInputChance}
            name="username"
            required
          />
        </FormControl>

        <FormControl variant="filled" sx={{ width: "100%" }}>
          <InputLabel>Email</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            value={formData.email}
            onChange={handleInputChance}
            name="email"
            type="email"
            required
          />
        </FormControl>

        <FormControl variant="filled" sx={{ width: "100%" }}>
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
                  required
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
          Kayıt Ol
        </Button>
        <a style={{cursor:"pointer",
        marginTop: "10px",
        fontSize:".6rem",
        fontFamily: "monospace",
        }} onClick={() => dispatch(setAuthItem("login"))}>Zaten hesabım var</a>
      </form>
    </div>
  );
};

export default Register;
