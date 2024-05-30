import { Button } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import { Avatar, Box } from "@mui/material";
import PropTypes from "prop-types";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateAvatar } from "../../../redux/actions/ProfileAction";
const webApiUrl = import.meta.env.VITE_API_BASE_URL;
const ChangeAvatar = ({ user }) => {

  const avatarFileInputRef = useRef(null);
  const [avatar, setAvatar] = useState({
    adress: user?.avatar,
    file: null,
  });
  const dispatch = useDispatch();
  const handleAvatar = () => {
    const newAdress = dispatch(updateAvatar(avatar.file, user));
    newAdress
      ? setAvatar({ adress: newAdress, file: null })
      : console.log("error");
  };
  const backAvatar = () => {
    setAvatar({
      adress: user?.background,
      file: null,
    });
  };
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
        src={avatar.file ? avatar.adress : webApiUrl + user.avatar}
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

      {avatar.file ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: ".5rem",
            width: "100%",
            padding: ".5rem",
          }}
        >
          <Button onClick={backAvatar}>
            <ClearIcon/>
          </Button>
          <Button onClick={handleAvatar}>
            <CheckIcon/>
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            padding:"1rem",
            gap: "1rem",
            borderBottom:".1rem solid gray"
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
              avatarFileInputRef.current.click();
            }}
          >
            <AddAPhotoIcon sx={{ fontSize: 20 }} />
          </Button>
        </Box>
      )}
      <input
        fontSize="small"
        type="file"
        id="avatar"
        name="avatar"
        ref={avatarFileInputRef}
        onChange={(e) => {
          setAvatar({
            adress: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
          });
        }}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default ChangeAvatar;
ChangeAvatar.propTypes = {
  user: PropTypes.object,
};
