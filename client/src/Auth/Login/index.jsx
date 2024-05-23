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
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const Login = ({ modalAction }) => {
  const isLoggedIn = useSelector(
    (state) => state.session && state.session.authenticated
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginClient(data));
    isLoggedIn && modalAction.handleClose();
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
        minHeight: "40vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          minWidth: "35vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <FormControlStyled>
          <InputLabel>E-posta</InputLabel>
          <FilledInput
            type="email"
            sx={{ background: "none", width: "100%" }}
            {...register("email", {
              required: "Bu alan gereklidir.",
              maxLength: {
                value: 40,
                message: "Maximum 40 karakter olabilir.",
              },
            })}
          />
          {errors.email && errors.email.message}
        </FormControlStyled>

        <FormControlStyled>
          <InputLabel htmlFor="filled-adornment-password">Şifre</InputLabel>
          <FilledInput
            sx={{ background: "none" }}
            {...register("password", {
              required: "Lütfen şifrenizi giriniz.",
              maxLength: {
                value: 25,
                message: "En fazla 25 karakter olabilir.",
              },
            })}
            name="password"
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
          {errors.password && errors.password.message}
        </FormControlStyled>

        <Button
          variant="outlined"
          type="submit"
          sx={{
            borderRadius: "1rem",
          }}
        >
          Giriş Yap
        </Button>
      </form>
    </Box>
  );
};

export default Login;
Login.propTypes = {
  modalAction: PropTypes.object,
};
