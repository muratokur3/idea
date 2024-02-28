import { FormControlLabel, Switch, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../../../redux/slices/UiSlice";
import { useEffect, useState } from "react";

const ChangeThemeMode = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.ui.themeMode);
  const [checked, setChecked] = useState(true);
  useEffect(() => {
    if (mode === "Light") {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [mode]);

  const ChangeTheme = () => {
    if (mode === "Light") {
      dispatch(setThemeMode("Dark"));
    } else {
      dispatch(setThemeMode("Light"));
    }
  };

  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={ChangeTheme} />}
      label={<Typography color="primary">{mode}</Typography>}
    />
  );
};

export default ChangeThemeMode;
