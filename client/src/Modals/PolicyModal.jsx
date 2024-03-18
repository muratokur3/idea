import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
const PolicyModals = ({policyElement,policyTitle}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Typography
       fontSize={".8rem"}
       sx={{
        cursor: "pointer",
        "&:hover": {
          color: "orange",
          textDecoration: "underline",
        },
       }}
        color="greenyellow"
        onClick={handleOpen}
      >
        {policyTitle}
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="login-dialog-title"
        maxWidth="md"
        fullWidth={true}
       
      >
       
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {policyElement}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
  export default PolicyModals;
  PolicyModals.propTypes = {
    policyElement: PropTypes.element,
    policyTitle: PropTypes.string,
  };