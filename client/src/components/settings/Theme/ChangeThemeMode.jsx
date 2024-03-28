import { Box, FormControlLabel, Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import { setThemeMode } from "../../../redux/slices/UiSlice";
import { useEffect, useState } from "react";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useTheme } from "@mui/material/styles";
const ChangeThemeMode = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  useEffect(() => {
    if (theme.palette.mode === "light") {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [theme]);

  const ChangeTheme = () => {
    if (theme.palette.mode === "light") {
      dispatch(setThemeMode("dark"));
    } else {
      dispatch(setThemeMode("light"));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap:".5rem",
      }}

    >
      {theme.palette.mode === "dark" ? 
        <LightModeOutlinedIcon color="primary" />: <NightsStayIcon color="primary" />
      }
      <FormControlLabel
        control={<Switch checked={checked} onChange={ChangeTheme} />}
      />
    </Box>
  );
};

export default ChangeThemeMode;
