import {
  Button,
  FilledInput,
  FormControl,
  InputLabel,
  TextareaAutosize,
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

const EditProfile = (user) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1234px)");

  const dispatch = useDispatch();
  const avatarFileInputRef = useRef(null);
  const backgroundFileInputRef = useRef(null);

  const [avatar, setAvatar] = useState({
    adress: user?.user?.avatar,
    file: null,
  });

  const [background, setBackground] = useState({
    adress: user?.user?.background,
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

  const handleInputChance = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function validateInput(inputValue) {
    const regex = /^(?!.*\b(www|http|https|\/)\b).*$/;
    return regex.test(inputValue);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validateInput(formData.github) &&
      validateInput(formData.linkedin) &&
      validateInput(formData.youtube) &&
      validateInput(formData.website) &&
      validateInput(formData.twitter)
    ) {
      const data = {
        _id: user?.user?._id,
        name: formData.name,
        surname: formData.surname,
        username: formData.username,
        bio: formData.bio,
        location: formData.location,
        avatar: user?.user?.avatar,
        background: user?.user?.background,
        socialAdress: {
          github: formData.github,
          linkedin: formData.linkedin,
          youtube: formData.youtube,
          website: formData.website,
          twitter: formData.twitter,
        },
      };
      dispatch(updateProfile(data, avatar.file, background.file));
    } else {
      alert(
        "lütfen sosyal medya hesaplarınızda sadece kullanıcı adınızı giriniz"
      );
    }
  };

  useEffect(() => {
    setFormData({
      name: user?.user?.name,
      surname: user?.user?.surname,
      username: user?.user?.username,
      bio: user?.user?.bio,
      location: user?.user?.location,
      github: user?.user?.socialAdress.github,
      linkedin: user?.user?.socialAdress.linkedin,
      youtube: user?.user?.socialAdress.youtube,
      website: user?.user?.socialAdress.website,
      twitter: user?.user?.socialAdress.twitter,
    });
  }, [user]);

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
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
          paddingTop:isMobile&& "10vh",
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
              borderBottomRightRadius: isMobile ? "50px" : "100px",
              borderBottomLeftRadius: isMobile ? "50px" : "100px",
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
        {
           isMobile&& <Box
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
            
          }
        <CardHeader
          sx={{
            background: "none",
            width:isMobile?"70%": "90%",
            color: "white",
            display: "flex",
            alignItems: "start",
          }}
          avatar={
           !isMobile&& <Box
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
          }
          title={
            <Card
              sx={{
                background: "transparent"
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: "flex",flexDirection:isMobile?"column":"row", gap: "10px" }}>
                    
                    <FormControl variant="filled" >
                      <InputLabel sx={{ background: "none"}}>Ad</InputLabel>
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

                    <FormControl
                      variant="filled"
                      sx={{ color: "white" }}
                    >
                      <InputLabel sx={{ background: "none", }}>
                        Soyad
                      </InputLabel>
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
                    <FormControl variant="filled" >
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
                    <FormControl variant="filled" >
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
                  maxRows={6}
                  maxLength={300}
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
                    maxHeight: "500px",
                    color: `${theme.palette.primary.main}`,
                  }}
                />
              </CardContent>
            </Card>
          }
        />

        <CardActions
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2%",
            justifyContent: "center",
          }}
        >
          <FormControl variant="filled">
            <InputLabel sx={{ background: "none", color: "gray" }}>
              <GitHubIcon fontSize="small" />
              github
            </InputLabel>
            <FilledInput
              sx={{ background: "none" }}
              value={formData?.github}
              onChange={handleInputChance}
              name="github"
            />
          </FormControl>

          <FormControl variant="filled" >
            <InputLabel sx={{ background: "none" }}>
              {" "}
              <LinkedInIcon fontSize="small" />
              LinkedIn
            </InputLabel>
            <FilledInput
              sx={{ background: "none"}}
              value={formData?.linkedin}
              onChange={handleInputChance}
              name="linkedin"
            />
          </FormControl>

          <FormControl variant="filled" >
            <InputLabel sx={{ background: "none" }}>
              {" "}
              <YouTubeIcon fontSize="small" />
              Youtube
            </InputLabel>
            <FilledInput
              sx={{ background: "none" }}
              value={formData?.youtube}
              onChange={handleInputChance}
              name="youtube"
            />
          </FormControl>

          <FormControl variant="filled" >
            <InputLabel sx={{ background: "none" }}>
              <XIcon fontSize="small" />
              Twitter
            </InputLabel>
            <FilledInput
              sx={{ background: "none"}}
              value={formData?.twitter}
              onChange={handleInputChance}
              name="twitter"
            />
          </FormControl>

          <FormControl variant="filled">
            <InputLabel sx={{ background: "none" }}>
              {" "}
              <LanguageIcon fontSize="small" />
              Website
            </InputLabel>
            <FilledInput
              sx={{ background: "none"}}
              value={formData?.website}
              onChange={handleInputChance}
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
