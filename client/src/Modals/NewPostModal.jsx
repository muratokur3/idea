import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  useMediaQuery,
} from "@mui/material";
import NewPost from "../components/post/NewPost";
import { useState } from "react";
const NewPostModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const widthThreshold = useMediaQuery("(max-width: 1234px)");
  
  return (
    <Box>
      <Button
        variant="outlined"
        color="primary"
        sx={{
          width: widthThreshold ? "60px" : "200px",
          borderRadius: "60px",
          borderColor: "gray",
          "&:hover": {
            borderColor: "white",
          },
        }}
        onClick={handleOpen}
      >
        {widthThreshold ? "+" : "yeni"}
      </Button>
      <Dialog open={open} onClose={handleClose}
      maxWidth="xl"
      fullWidth={true}
      sx={{
        "& .MuiDialog-paper": {
          width: "90vw",
          boxShadow: "none",
        },
      
      }}
        >
        <DialogContent>
          <NewPost />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewPostModal;
