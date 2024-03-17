import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useState } from "react";
import EditProfile from "../components/profile/EditProfile";
import { useSelector } from "react-redux";
const EditProfileModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const loginedUser = useSelector((state) => state.profile.user);
  return (
    <Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        sx={{
          width: "100%",
          fontSize: ".8rem",
          borderRadius: "30px",
         
        }}
        endIcon={<AppRegistrationIcon />}
      >
        PROFİLİ DÜZENLE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="login-dialog-title"
        maxWidth="xl"
        fullWidth={true}
        sx={{
          "& .MuiDialog-paper": {
            width: "100vw",
            height: "auto",
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EditProfile user={loginedUser} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default EditProfileModal;
