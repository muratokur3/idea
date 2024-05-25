import {
  Button,
  FilledInput,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { useDispatch } from "react-redux";
import {useState } from "react";
import { updateProfile } from "../../../redux/actions/ProfileAction";
import PropTypes from "prop-types";
import ChangeBackground from "./ChangeBackground";
import ChangeAvatar from "./ChangeAvatar";
import ChangeSocial from "./ChangeSocial";
// const webApiUrl=import.meta.env.VITE_API_BASE_URL;

const EditProfile = ({ user, modalAction }) => {
  const theme = useTheme();
  const isPhone = useMediaQuery("(max-width: 600px)");

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    surname: user?.surname || "",
    username: user?.username || "",
    bio: user?.bio || "",
    location: user?.location || "",
    email: user?.socialAdress?.email || "",
    github: user?.socialAdress?.github || "",
    linkedin: user?.socialAdress?.linkedin || "",
    youtube: user?.socilaAdress?.youtube || "",
    website: user?.socilaAdress?.website || "",
    twitter: user?.socilaAdress?.twitter || "",
  });
  
  // name surname inputları için regex.
  const nameSurnameControl = (name, surname) => {
    const regex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ]{2,20}$/;
    return regex.test(name) && regex.test(surname);
  };

  // username input kontrolü için regex
  const usernameControl = (username) => {
    const regex = /^[a-z0-9._]{3,20}$/;
    return regex.test(username);
  };

  //location input kontrolü için türkçe karakter de kabul eden regex
  const locationControl = (location) => {
    const regex = /^[a-zA-ZığüşöçİĞÜŞÖÇ\s,._-]{2,20}$/;
    return regex.test(location);
  };

  const handleInputChance = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const regexControl = () => {
    if (
      nameSurnameControl(formData.name, formData.surname) &&
      usernameControl(formData.username) &&
      locationControl(formData.location)
    ) {
      {
        return true;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (regexControl()) {
      const data = {
        _id: user?._id,
        name: formData.name,
        surname: formData.surname,
        username: formData.username,
        bio: formData.bio,
        location: formData.location,
        socialAdress: {
          email:formData.email,
          website: formData.website,
          github: formData.github,
          linkedin: formData.linkedin,
          youtube: formData.youtube,
          twitter: formData.twitter,
        },
      };
      dispatch(updateProfile(data, modalAction));
    } else {
      alert("Lütfen bilgileri tekrar kontrol edin");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Card
        sx={{
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          paddingBottom: "20px",
          paddingTop: isPhone && "10vh",
        }}
      >
        <ChangeBackground user={user} />
        {isPhone && <ChangeAvatar user={user} />}
        <CardHeader
          sx={{
            background: "none",
            width: isPhone ? "100%" : "90%",
            maxWidth: isPhone ? "500px" : "800",
            color: "white",
            display: "flex",
            alignItems: "start",
          }}
          avatar={!isPhone && <ChangeAvatar user={user} />}
          title={
            <Card
              sx={{
                background: "transparent",
              }}
            >
              <CardHeader
                title={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: isPhone ? "column" : "row",
                      gap: "10px",
                    }}
                  >
                    <FormControl variant="filled">
                      <InputLabel sx={{ background: "none" }}>Ad</InputLabel>
                      <FilledInput
                        sx={{
                          background: "none",
                        }}
                        value={formData.name}
                        onChange={handleInputChance}
                        name="name"
                        required
                      />
                    </FormControl>

                    <FormControl variant="filled" sx={{ color: "white" }}>
                      <InputLabel sx={{ background: "none" }}>Soyad</InputLabel>
                      <FilledInput
                        sx={{
                          background: "none",
                        }}
                        value={formData.surname}
                        onChange={handleInputChance}
                        name="surname"
                        required
                      />
                    </FormControl>
                  </Box>
                }
                titleTypographyProps={{ fontSize: "1rem" }}
                subheader={
                  <Box display={"flex"} flexDirection={"column"}>
                    <FormControl variant="filled">
                      <InputLabel>Kullanıcı adı</InputLabel>
                      <FilledInput
                        sx={{
                          background: "none",
                        }}
                        value={formData.username}
                        onChange={handleInputChance}
                        name="username"
                        required
                      />
                    </FormControl>
                    <FormControl variant="filled">
                      <InputLabel>Şehir</InputLabel>
                      <FilledInput
                        sx={{
                          background: "none",
                        }}
                        value={formData.location}
                        onChange={handleInputChance}
                        name="location"
                      />
                    </FormControl>
                  </Box>
                }
              />

              <CardContent
                sx={{
                  fontSize: "0.7rem",
                  padding: "10px",
                }}
              >
                <TextareaAutosize
                  value={formData.bio}
                  onChange={handleInputChance}
                  minRows={3}
                  maxLength={200}
                  placeholder="Bio"
                  name="bio"
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontFamily: "monospace",
                    fontSize: ".9rem",
                    background: "none",
                    overflow: "hidden",
                    padding: "5px 0",
                    resize: "none",
                    "&::placeholder": {
                      fontSize: "1rem",
                    },
                    maxHeight: "10vh",
                    color: `${theme.palette.primary.main}`,
                  }}
                />
                <Typography
                  sx={{
                    textAlign: "end",
                    color: 200 - formData.bio.length === 0 ? "red" : "gray",
                  }}
                >
                  {200 - formData.bio.length}
                </Typography>
              </CardContent>
            </Card>
          }
        />
        {user && (
          <ChangeSocial
            formData={formData}
            handleInputChance={handleInputChance}
          />
        )}
        <Button variant="outlined" type="submit">
          Kaydet
        </Button>
      </Card>
    </form>
  );
};

export default EditProfile;
EditProfile.propTypes = {
  user: PropTypes.object,
  modalAction: PropTypes.object,
};
