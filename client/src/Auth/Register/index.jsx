import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "../../redux/actions/AuthAction";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";

const Register = ({modalAction}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleInputChance = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   // name surname inputları için regex.
   const nameSurnameControl = (name, surname) => {
    const regex = /^[a-zA-Z]{2,20}$/;
    return (regex.test(name) && regex.test(surname))
  };

  //mail input kontrolü için regex
  const emailControl = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,30}$/;
    return (regex.test(email)) 
   
  };

  // usernaem input kontrolü için regex
  const usernameControl = (username) => {
    const regex = /^[a-z0-9._]{3,20}$/;
    return (regex.test(username))
  };

  // şifre input kontrolü için regex
  const passwordControl = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
    if (regex.test(password)) {
      return true;
    } else {
      return false;
    }
  };

  const register = async (e) => {
    e.preventDefault();
    if (!nameSurnameControl(formData.name, formData.surname)) {
      alert("Ad ve Soyad en az 2 en fazla 20 karakter olmalıdır.");
      return;
    }
    if (!usernameControl(formData.username)) {
      alert(
        "Kullanıcı adı en az 3 en fazla 20 karakter olmalıdır.Küçük harf, nokta ve alt çizgi içerebilir."
      );
      return;
    }
    if (!passwordControl(formData.password)) {
      alert(
        "Şifre en az 8 karakter olmalıdır. En az bir büyük harf, bir küçük harf ve bir rakam içermelidir."
      );
      return;
    }
    if (!emailControl(formData.email)) {
      alert("Geçerli bir email adresi giriniz.");
      return;
    }
    dispatch(registerUser(formData));
    modalAction.handleClose();
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const FormControlStyled = styled(FormControl)({
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
          minWidth: "30vw",
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

        <FormControlStyled sx={{ width: "90%" }}>
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
          variant="outlined"
          type="submit"
          sx={{
            borderRadius: "1rem",
          }}
        >
          Kayıt Ol
        </Button>
      </form>
    </Box>
  );
};

export default Register;
Register.propTypes = {
  modalAction: PropTypes.object,
};