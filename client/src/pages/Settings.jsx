import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import ChangePassword from "../components/settings/ChangePassword";
import AccountSettings from "../components/settings/AccountSettings";
import EmailSettings from "../components/settings/EmailSettings";

const Settings = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        paddingTop: "10vh",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" gutterBottom component="div" color={"primary"}>
        Ayarlar
      </Typography>

      <EmailSettings/>

      <ChangePassword />

      <AccountSettings />

     
    </Box>
  );
};
export default Settings;
