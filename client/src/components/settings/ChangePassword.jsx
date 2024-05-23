import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import axios from "../../../axiosConfig";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const userId = useSelector(
    (state) => state.session && state.session?.user?._id
  );

  const [expanded, setExpanded] = useState(false);
  const [showOldPassword, setshowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowPassword = (setShowPassword) =>
    setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  //-------
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    repaitNewPassword: "",
  });
  const handleInputChance = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //-------

  const handleChancePassword = async () => {
    if (
      formData.oldPassword === "" ||
      formData.newPassword === "" ||
      formData.repaitNewPassword === ""
    ) {
      alert("Lütfen tüm alanları doldurun");
      return;
    }
    if (formData.newPassword !== formData.repaitNewPassword) {
      alert("Yeni şifreler uyuşmuyor");
      return;
    }
    const response = await axios.post(`auth/changePassword/${userId}`, {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });
    if (response.status !== 200) {
      alert(response.data.error);
      return;
    } else {
      alert("Şifreniz başarıyla değiştirildi.");
    }
  };

  const handleCancelPassword = () => {
    setExpanded(false);
    setFormData({
      oldPassword: "",
      newPassword: "",
      repaitNewPassword: "",
    });
  };

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={() => setExpanded(!expanded)}
        aria-controls="Şifre Değiştirme"
        id="panel3-header"
      >
        Şifre Değiştirme
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          paddingLeft: "10%",
        }}
      >
        <FormControl variant="filled" sx={{ width: "50%" }}>
          <InputLabel htmlFor="filled-adornment-password">
            Eski Şifreniz
          </InputLabel>
          <FilledInput
            sx={{ background: "none" }}
            value={formData.oldPassword}
            onChange={handleInputChance}
            name="oldPassword"
            required
            id="filled-adornment-password"
            type={showOldPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword(setshowOldPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl variant="filled" sx={{ width: "50%" }}>
          <InputLabel htmlFor="filled-adornment-password">
            Yeni Şifreniz
          </InputLabel>
          <FilledInput
            sx={{ background: "none" }}
            value={formData.newPassword}
            onChange={handleInputChance}
            name="newPassword"
            required
            id="filled-adornment-password"
            type={showNewPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword(setShowNewPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl variant="filled" sx={{ width: "50%" }}>
          <InputLabel htmlFor="filled-adornment-password">
            Yeni Şifreniz Tekrar
          </InputLabel>
          <FilledInput
            sx={{ background: "none" }}
            value={formData.repaitNewPassword}
            onChange={handleInputChance}
            name="repaitNewPassword"
            required
            id="filled-adornment-password"
            type={showNewPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword(setShowNewPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </AccordionDetails>
      <AccordionActions>
        <Button onClick={handleCancelPassword}>
          İptal Et
        </Button>
        <Button color="primary" onClick={handleChancePassword}>
          Kaydet
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default ChangePassword;
