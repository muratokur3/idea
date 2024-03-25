import { Box } from "@mui/material";
import PropTypes from "prop-types";

const NotFound = ({ text }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
      }}
    >
      {text}
    </Box>
  );
};

export default NotFound;
NotFound.propTypes = {
  text: PropTypes.string,
  defaultProps: {
    text: "Aradığınız sayfa bulunamadı.",
  },
};
