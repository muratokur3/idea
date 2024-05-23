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
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { updateProfile } from "../../redux/actions/ProfileAction";
import PropTypes from "prop-types";
// const webApiUrl=import.meta.env.VITE_API_BASE_URL;

const EditProfile = ({ user, modalAction }) => {
  const theme = useTheme();
  const isPhone = useMediaQuery("(max-width: 600px)");

  const dispatch = useDispatch();
  const avatarFileInputRef = useRef(null);
  const backgroundFileInputRef = useRef(null);

  const [avatar, setAvatar] = useState({
    adress: user?.avatar,
    file: null,
  });

  const [background, setBackground] = useState({
    adress: user?.background,
    file: null,
  });

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    bio: "",
    location: "",
    github: "",
    linkedin: "",
    youtube: "",
    website: "",
    twitter: "",
  });

  // name surname inputları için regex.
  const nameSurnameControl = (name, surname) => {
    const regex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ]{2,20}$/;
    return regex.test(name) && regex.test(surname);
  };

  // usernaem input kontrolü için regex
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

  // const validateInput = () => {
  //   // verilen inputlarda wwww, https, .com, hhtp gibi kelimelerin olup olmadığını kontrol eden regex
  //   const regex =
  //     /^((?!www\.|github|youtube|twitter|\.com|http|https|:\/\/|https?:\/\/)[a-zA-Z0-9._-]+)$/;

  //   return (
  //     (formData.github.length === 0 || regex.test(formData.github)) &&
  //     (formData.linkedin.length === 0 || regex.test(formData.linkedin)) &&
  //     (formData.youtube.length === 0 || regex.test(formData.youtube)) &&
  //     (formData.twitter.length === 0 || regex.test(formData.twitter))
  //   );
  // };

  // const validateInputWbsite = () => {
  //   // verilen inputlarda sadece domain girişi almaya zorlayan regex
  //   const regex =
  //     /^((?!www\.|www|http|https|:\/\/|https?:\/\/)[a-zA-Z0-9._-]+)$/;
  //   return regex.test(formData.website);
  // };

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
        avatar: user?.avatar,
        background: user?.background,
        socialAdress: {
          github: formData.github,
          linkedin: formData.linkedin,
          youtube: formData.youtube,
          website: formData.website,
          twitter: formData.twitter,
        },
      };
      dispatch(updateProfile(data, avatar.file, background.file));
      modalAction.handleClose();
    } else {
      alert("Lütfen bilgileri tekrar kontrol edin");
    }
  };

  useEffect(() => {
    setFormData({
      name: user?.name,
      surname: user?.surname,
      username: user?.username,
      bio: user?.bio,
      location: user?.location,
      github: user?.socialAdress.github,
      linkedin: user?.socialAdress.linkedin,
      youtube: user?.socialAdress.youtube,
      website: user?.socialAdress.website,
      twitter: user?.socialAdress.twitter,
    });
  }, [user]);

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Card
        id="user-detail-card"
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
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <img
            src={background.adress}
            style={{
              width: "100%",
              height: "20vh",
              minHeight: "400px",
              objectFit: "cover",
              borderBottomRightRadius: isPhone ? "50px" : "100px",
              borderBottomLeftRadius: isPhone ? "50px" : "100px",
            }}
          />
          <Button
            sx={{
              width: "5vh",
              height: "5vh",
              position: "absolute",
              bottom: "3%",
              right: "3%",
            }}
            onClick={() => {
              backgroundFileInputRef.current.click();
            }}
          >
            <AddAPhotoIcon />
          </Button>
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
        {isPhone && (
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Avatar
              src={avatar.adress}
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
            <Button
              sx={{
                width: "3vw",
                height: "3vw",
                position: "absolute",
                bottom: "-2%",
                right: "-2%",
              }}
              onClick={() => {
                avatarFileInputRef.current.click();
              }}
            >
              <AddAPhotoIcon />
            </Button>
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
        )}
        <CardHeader
          sx={{
            background: "none",
            width: isPhone ? "100%" : "90%",
            maxWidth: isPhone ? "500px" : "800",
            color: "white",
            display: "flex",
            alignItems: "start",
          }}
          avatar={
            !isPhone && (
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Avatar
                  src={avatar.adress}
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
                <Button
                  sx={{
                    width: "3vw",
                    height: "3vw",
                    position: "absolute",
                    bottom: "-5%",
                    right: "-5%",
                  }}
                  onClick={() => {
                    avatarFileInputRef.current.click();
                  }}
                >
                  <AddAPhotoIcon />
                </Button>
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
            )
          }
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

        <CardActions
          sx={{
            width: isPhone ? "100%" : "90%",
            maxWidth: isPhone ? "500px" : "800",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem 5rem",
            justifyContent: "center",
          }}
        >
          <FormControl variant="filled" sx={{ width:isPhone ?"80%":"40%"}}>
            <InputLabel sx={{ background: "none"}}>
              <GitHubIcon fontSize="small" />
              github
            </InputLabel>
            <FilledInput
              sx={{ background: "none" }}
              value={formData?.github}
              onChange={handleInputChance}
              placeholder="https://github.com/"
              placeholderTextColor="gray"
              name="github"
            />
          </FormControl>

          <FormControl variant="filled" sx={{ width:isPhone ?"80%":"40%"}}>
            <InputLabel sx={{ background: "none" }}>
              {" "}
              <LinkedInIcon fontSize="small" />
              LinkedIn
            </InputLabel>
            <FilledInput
              sx={{ background: "none" }}
              value={formData?.linkedin}
              onChange={handleInputChance}
              placeholder="https://linkedin.com/"
              placeholderTextColor="gray"
              name="linkedin"
            />
          </FormControl>

          <FormControl variant="filled"sx={{ width:isPhone ?"80%":"40%"}}>
            <InputLabel sx={{ background: "none" }}>
              {" "}
              <YouTubeIcon fontSize="small" />
              Youtube
            </InputLabel>
            <FilledInput
              sx={{ background: "none" }}
              value={formData?.youtube}
              onChange={handleInputChance}
              placeholder="https://youtube.com/"
              placeholderTextColor="gray"
              name="youtube"
            />
          </FormControl>

          <FormControl variant="filled"sx={{ width:isPhone ?"80%":"40%"}}>
            <InputLabel sx={{ background: "none" }}>
              <XIcon fontSize="small" />
              Twitter
            </InputLabel>
            <FilledInput
              sx={{ background: "none" }}
              value={formData?.twitter}
              onChange={handleInputChance}
              placeholder="https://x.com/"
              placeholderTextColor="gray"
              name="twitter"
            />
          </FormControl>

          <FormControl variant="filled"sx={{ width:isPhone ?"80%":"40%"}}>
            <InputLabel sx={{ background: "none" }}>
              <LanguageIcon fontSize="small" />
              Website
            </InputLabel>
            <FilledInput
              sx={{ background: "none" }}
              value={formData?.website}
              onChange={handleInputChance}
              placeholder="idea.tr idea.com.."
              name="website"
            />
          </FormControl>
        </CardActions>

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
