import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { loginClient } from "../../redux/actions/AuthAction";
import styled from "@emotion/styled";
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

  const FormControlStyled=styled(FormControl)({
    variant: "filled",
    width: "100%",

  });
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "40vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={login}
        style={{
          minWidth:"35vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <FormControlStyled>
          <InputLabel>Email</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            value={formData.email}
            onChange={handleInputChance}
            name="email"
            required
          />
        </FormControlStyled>

        <FormControlStyled>
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
        </FormControlStyled>

        <Button
          type="submit"
          sx={{
            color: "primary",
            border: "1px solid gray",
            borderRadius: "20px",
            padding: "5px 30px",
          }}
        >
          Giriş Yap
        </Button>
      </form>
    </Box>
  );
};

export default Login;
