import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "../../redux/actions/AuthAction";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import PolicyModals from "../../Modals/PolicyModal";
import PrivacyPolicy from "../../components/policys/PrivacyPolicy";
import TermsOfService from "../../components/policys/TermsOfService";

const Register = ({ modalAction }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data))
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
  console.log(errors.firstname);
  console.log(errors.firstname?.message);
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
        onSubmit={handleSubmit(onSubmit)}
        style={{
          minWidth: "30vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          padding: "1rem 0",
        }}
      >
        <FormControlStyled>
          <InputLabel>Ad</InputLabel>
          <FilledInput
            {...register("name", {
              required: "Bu alan gereklidir.",
              minLength: { value: 2, message: "En az 2 karakter olmalıdır." },
              maxLength: {
                value: 20,
                message: "En fazla 20 karakter olabilir.",
              },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Sadece harf içermelidir.",
              },
            })}
            sx={{ background: "none", width: "100%" }}
          />
          {errors.name && errors.name.message}
        </FormControlStyled>

        <FormControlStyled>
          <InputLabel>Soyad</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            {...register("surname", {
              required: "Bu alan gereklidir.",
              minLength: { value: 2, message: "En az 2 karakter olmalıdır." },
              maxLength: {
                value: 20,
                message: "En fazla 20 karakter olabilir.",
              },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Sadece harf içermelidir.",
              },
            })}
          />
          {errors.lastname && errors.lastname.message}
        </FormControlStyled>

        <FormControlStyled>
          <InputLabel>Kullanıcı adı</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            {...register("username", {
              required: "Bu alan gereklidir.",
              minLength: { value: 3, message: "En az 3 karakter olmalıdır." },
              maxLength: {
                value: 15,
                message: "En fazla 15 karakter olabilir.",
              },
              pattern: {
                value: /^[a-z][a-z0-9._-]*[^.]$/,
                message:
                  "Sadece ( . _ -) karakterlerini içerebilir. Harflerle başlamalı ve nokta ile bitmemeli.",
              },
            })}
          />
          {errors.username && errors.username.message}
        </FormControlStyled>

        <FormControlStyled>
          <InputLabel>E-posta</InputLabel>
          <FilledInput
          type="email"
            sx={{ background: "none", width: "100%" }}
            {...register("email", {
              required: "Bu alan gereklidir.",
              maxLength: {
                value: 40,
                message: "En fazla 40 karakter olabilir.",
              },
            })}
          />
          {errors.email && errors.email.message}
        </FormControlStyled>

        <FormControlStyled sx={{ width: "90%" }}>
          <InputLabel htmlFor="filled-adornment-password">Şifre</InputLabel>
          <FilledInput
            sx={{ background: "none", width: "100%" }}
            {...register("password", {
              required: "Bu alan gereklidir.",
              minLength: { value: 8, message: "En az 8 karakter olmalıdır." },
              maxLength: {
                value: 25,
                message: "En fazla 25 karakter olabilir.",
              },
              pattern: {
                value: /^(?=.*[A-Z]).*$/,
                message:
                  "En az bir büyük harf, bir küçük harf ve bir sayı içermelidir.",
              },
            })}
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
          {errors.password && errors.password.message}
        </FormControlStyled>
        <Box display={"flex"} flexDirection={"row"} gap={"3px"}>
          <Typography fontSize={".8rem"}>kayıt olarak </Typography>
          <PolicyModals
            policyElement={<PrivacyPolicy />}
            policyTitle="gizlilik politikasını"
          />{" "}
          <Typography fontSize={".8rem"}> ve</Typography>
          <PolicyModals
            policyElement={<TermsOfService />}
            policyTitle=" hizmet şartlarını"
          />
          <Typography fontSize={".8rem"}> kabul etmiş olursunuz.</Typography>
        </Box>
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
