import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "../../redux/actions/AuthAction";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { useState } from "react";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";

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

  const FormControlStyled=styled(FormControl)({
    variant: "filled",
    width: "100%",

  });
  
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={register}
        style={{
          minWidth:"30vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <FormControlStyled>
          <InputLabel>Ad</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            value={formData.name}
            onChange={handleInputChance}
            name="name"
            required
          />
        </FormControlStyled>

        <FormControlStyled>
          <InputLabel>Soyad</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            value={formData.surname}
            onChange={handleInputChance}
            name="surname"
            required
          />
        </FormControlStyled>

        <FormControlStyled>
          <InputLabel>Kullanıcı adı</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            value={formData.username}
            onChange={handleInputChance}
            name="username"
            required
          />
        </FormControlStyled>

        <FormControlStyled>
          <InputLabel>Email</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            value={formData.email}
            onChange={handleInputChance}
            name="email"
            type="email"
            required
          />
        </FormControlStyled>

        <FormControlStyled sx={{width: "90%"}}>
          <InputLabel htmlFor="filled-adornment-password">Şifre</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
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
          Kayıt Ol
        </Button>
      </form>
    </Box>
  );
};

export default Register;
