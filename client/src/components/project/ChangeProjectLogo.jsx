import Avatar from "@mui/material/Avatar";
import { useRef } from "react";
import { Box, Button } from "@mui/material";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PropTypes from "prop-types";
const webApiUrl = import.meta.env.VITE_API_BASE_URL;
const ChangeProjectLogo = ({
  project,
  logo,
  setLogo,
  handleLogo,
  backLogo,
}) => {
  const logoFileInputRef = useRef(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Avatar
        src={logo.file ? logo.adress : webApiUrl + project?.logo}
        sx={{
          width: "15vh",
          height: "15vh",
          maxHeight: "150px",
          maxWidth: "150px",
          border: "5px solid black",
        }}
        aria-label="recipe"
      >
        R
      </Avatar>

      {project&& logo.file  ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: ".5rem",
            width: "100%",
            padding: ".5rem",
          }}
        >
          <Button onClick={backLogo}>
            <ClearIcon />
          </Button>
          <Button onClick={handleLogo}>
            <CheckIcon />
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            padding: "1rem",
            gap: "1rem",
            borderBottom: ".1rem solid gray",
          }}
        >
          <Button
            sx={{
              opacity: ".7",
              ":hover": { opacity: "1" },
            }}
            onClick={() => {}}
          >
            <NoPhotographyIcon sx={{ fontSize: 20 }} />
          </Button>
          <Button
            sx={{
              opacity: ".7",
              ":hover": { opacity: "1" },
            }}
            onClick={() => {
              logoFileInputRef.current.click();
            }}
          >
            <AddAPhotoIcon sx={{ fontSize: 20 }} />
          </Button>
        </Box>
      )}
      <input
        fontSize="small"
        type="file"
        id="logo"
        name="logo"
        ref={logoFileInputRef}
        onChange={(e) => {
          setLogo({
            adress: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
          });
        }}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default ChangeProjectLogo;
ChangeProjectLogo.propTypes = {
  logo: PropTypes.object,
  setLogo: PropTypes.func,
  handleLogo: PropTypes.func,
  backLogo: PropTypes.func,
  project: PropTypes,
};
