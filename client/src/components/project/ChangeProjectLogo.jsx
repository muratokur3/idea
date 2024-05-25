import Avatar from "@mui/material/Avatar";
import { useRef, useState } from "react";
import { Box, Button } from "@mui/material";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PropTypes from "prop-types";

const webSiteUrl = import.meta.env.VITE_WEBSITE_BASE_URL;
const ChangeProjectLogo = ({ project }) => {
  const logoFileInputRef = useRef(null);
  const [logo, setLogo] = useState({
    adress: project ? webSiteUrl + project.logo : "",
    file: null,
  });

  return (
    <Box
      sx={{
        position: "relative",
        width: "100px",
      }}
    >
      {" "}
      <Avatar
        alt="Proje icon"
        src={logo?.adress}
        sx={{
          width: "10vh",
          height: "10vh",
          maxHeight: "200px",
          maxWidth: "200px",
        }}
      >
        Logo
      </Avatar>
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
      <Button
        sx={{
          width: "3vw",
          height: "3vw",
          position: "absolute",
          bottom: "-2%",
          right: "-2%",
        }}
        onClick={() => {
          logoFileInputRef.current.click();
        }}
      >
        <AddAPhotoIcon />
      </Button>
    </Box>
  );
};

export default ChangeProjectLogo;
ChangeProjectLogo.propTypes = {
  project: PropTypes.object.isRequired,
};
