import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import ChangePassword from "../components/settings/ChangePassword";
import AccountSettings from "../components/settings/AccountSettings";

const Settings = () => {
  return (
    <Box
      sx={{
        margin: "0 20px",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        paddingTop: "10vh",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" gutterBottom component="div" color={"primary"}>
        Ayarlar
      </Typography>

      <ChangePassword />

      <AccountSettings />
     
    </Box>
  );
};
export default Settings;
