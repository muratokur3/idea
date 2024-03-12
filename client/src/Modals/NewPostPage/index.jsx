import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import NewPost from "../../components/post/NewPost";
import "./new-post-page.scss";
import { useState } from "react";
const NewPostPage = (widthThreshold) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Button
        variant="outlined"
        color="primary"
        sx={{
          width: widthThreshold ? "15px" : "80%",
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
          width: "50vw",
          boxShadow: "none",
        },
      
      }}
        >
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
        </DialogActions>
        <DialogContent>
          <NewPost />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NewPostPage;
