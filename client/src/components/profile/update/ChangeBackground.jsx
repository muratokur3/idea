import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import { Button, Box, useMediaQuery } from "@mui/material";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateBackground } from "../../../redux/actions/ProfileAction";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from "@mui/material/styles";
const webApiUrl = import.meta.env.VITE_API_BASE_URL;
const ChangeBackground = ({ user }) => {
  const dispatch = useDispatch();
  const isPhone = useMediaQuery("(max-width: 600px)");
  const theme=useTheme()
  const backgroundFileInputRef = useRef(null);
  const [background, setBackground] = useState({
    adress: user?.background,
    file: null,
  });
  const handleBackground = () => {
    const newAdress = dispatch(updateBackground(background.file, user));
    newAdress
      ? setBackground({ adress: newAdress, file: null })
      : console.log("error");
  };
  const backBacground = () => {
    setBackground({
      adress: user?.background,
      file: null,
    });
  };
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <img
        src={background.file ? background.adress : webApiUrl + user.background}
        style={{
          width: "100%",
          height: "20vh",
          minHeight: "400px",
          objectFit: "cover",
          borderBottomRightRadius: isPhone ? "50px" : "100px",
          borderBottomLeftRadius: isPhone ? "50px" : "100px",
        }}
      />

      {background.file ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            width: "100%",
            padding: "1rem",
            borderBottom: "1px solid gray",
          }}
        >
          <Button onClick={handleBackground} variant="outlined" startIcon={<CheckIcon/>}>
            Uygula
          </Button>
          <Button onClick={backBacground} variant="outlined" startIcon={<ClearIcon/>}>
            Vazgeç
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            bottom: "40%",
            right: "40%",
            display: "flex",
            gap: "1rem",
            padding:"2rem",
            borderRadius:"10%",
            backgroundColor:theme.palette.mode==="dark"?"#00000084":"#faf8f884",
          }}
        >
          <Button
            sx={{
              backgroundColor: "none",
              opacity: ".7",
              ":hover": { opacity: "1" },
            }}
            // onClick={() => {dispatch(unInstallImage(user,"background"))}}
          >
            <NoPhotographyIcon sx={{ fontSize: 50 }} />
          </Button>
          <Button
            sx={{
              backgroundColor: "none",
              opacity: ".7",
              ":hover": { opacity: "1" },
            }}
            onClick={() => {
              backgroundFileInputRef.current.click();
            }}
          >
            <AddAPhotoOutlinedIcon sx={{ fontSize: 50 }} />
          </Button>
        </Box>
      )}

      <input
        fontSize="small"
        type="file"
        id="background"
        name="background"
        ref={backgroundFileInputRef}
        onChange={(e) => {
          setBackground({
            adress: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
          });
        }}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default ChangeBackground;
ChangeBackground.propTypes = {
  user: PropTypes.object,
};
