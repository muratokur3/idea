import {
  Button,
  FilledInput,
  FormControl,
  InputLabel,
  TextareaAutosize,
} from "@mui/material";

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
import { setEditProfilePage } from "../../redux/slices/UiSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "./edit-profile.scss";
import { ubdateProfile } from "../../redux/actions/ProfileAction";

const EditProfile = (user) => {
  const dispatch = useDispatch();
  const avatarFileInputRef = useRef(null);
  const backgroundFileInputRef = useRef(null);

  const chanceAvatarClick = () => {
    avatarFileInputRef.current.click();
  };

  const chanceBackgroundClick = () => {
    backgroundFileInputRef.current.click();
  };

 

  const [avatar, setAvatar] = useState({
    adress: "",
    file: null,
  });

  const [background, setBackground] = useState({adress:user.user.background,file:null});

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    bio: "",
    location: "",
    socialAdress: {
      github: "",
      linkedin: "",
      youtube: "",
      website: "",
      twitter: "",
    },
  });

  const handleInputChance = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({
      name: user.user.name,
      surname: user.user.surname,
      username: user.user.username,
      bio: user.user.bio,
      location: user.user.location,
      background: user.user.background,
      github: user.user.socialAdress.github,
      linkedin: user.user.socialAdress.linkedin,
      youtube: user.user.socialAdress.youtube,
      website: user.user.socialAdress.website,
      twitter: user.user.socialAdress.twitter,
    });
    setAvatar({ adress: user.user.avatar, file: null });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      _id: user.user._id,
      name: formData.name,
      surname: formData.surname,
      username: formData.username,
      bio: formData.bio,
      location: formData.location,
      socialAdress: {
        github: formData.github,
        linkedin: formData.linkedin,
        youtube: formData.youtube,
        website: formData.website,
        twitter: formData.twitter,
      },
    };

    dispatch(ubdateProfile(data, avatar.file,background.file));
  };

  return (
    <div id="edit-profile-page">
      <div
        id="modal-overlay"
        onClick={() => dispatch(setEditProfilePage(false))}
      ></div>
      <div id="box-edit-profile">
        <form
          onSubmit={handleSubmit}
          id="edit-profile-form"
          encType="multipart/form-data"
        >
          <Card id="user-detail-card">
            <Box sx={{
              position: "relative",
              
            }}>
              <img id="background-image" src={background.adress} />
            <Button
                    sx={{
                      width: "140px",
                      height: "140px",
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                    }}
                    onClick={chanceBackgroundClick}
                    onChange={e=>{
                      setAvatar({
                        adress: URL.createObjectURL(e.target.files[0]),
                        file: e.target.files[0],
                      })
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
                    onChange={e=>{
                      setBackground({
                        adress: URL.createObjectURL(e.target.files[0]),
                        file: e.target.files[0],
                      })
                    }}
                    style={{ display: "none" }}
                   />
            </Box>
            
            <CardHeader
              sx={{
                background: "none",
                color: "white",
                display: "flex",
                alignItems: "start",
              }}
              avatar={
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <Avatar
                    src={avatar.adress}
                    sx={{
                      width: 150,
                      height: 150,
                      border: "5px solid black",
                    }}
                    aria-label="recipe"
                  >
                    R
                  </Avatar>
                  <Button
                    sx={{
                      width: "40px",
                      height: "40px",
                      position: "absolute",
                      bottom: "-5%",
                      right: "-5%",
                    }}
                    onClick={chanceAvatarClick}
                  >
                    <AddAPhotoIcon />
                  </Button>
                  <input
                    fontSize="small"
                    type="file"
                    id="avatar"
                    name="avatar"
                    ref={avatarFileInputRef}
                    onChange={e=>{
                      setAvatar({
                        adress: URL.createObjectURL(e.target.files[0]),
                        file: e.target.files[0],
                      })
                    }}
                    style={{ display: "none" }}
                   
                  />
                </Box>
              }
              title={
                <Card
                  sx={{
                    background: "transparent",
                  }}
                >
                  <CardHeader
                    action={
                      <Button type="submit" id="edit-profile-submit">
                        Kaydet
                      </Button>
                    }
                    title={
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <FormControl
                          variant="filled"
                          sx={{ width: "40%", color: "white" }}
                        >
                          <InputLabel
                            sx={{ background: "none", color: "gray" }}
                          >
                            Ad
                          </InputLabel>
                          <FilledInput
                            sx={{
                              background: "none",
                              color: "white",
                              width: "100%",
                            }}
                            value={formData.name}
                            onChange={handleInputChance}
                            name="name"
                            required
                          />
                        </FormControl>

                        <FormControl
                          variant="filled"
                          sx={{ width: "40%", color: "white" }}
                        >
                          <InputLabel
                            sx={{ background: "none", color: "gray" }}
                          >
                            Soyad
                          </InputLabel>
                          <FilledInput
                            sx={{
                              background: "none",
                              color: "white",
                              width: "100%",
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
                      <Box>
                        <FormControl variant="filled" sx={{ width: "100%" }}>
                          <InputLabel
                            sx={{ background: "none", color: "gray" }}
                          >
                            Kullanıcı adı
                          </InputLabel>
                          <FilledInput
                            sx={{
                              background: "none",
                              color: "white",
                              width: "90%",
                            }}
                            value={formData.username}
                            onChange={handleInputChance}
                            name="username"
                            required
                          />
                        </FormControl>
                        <FormControl variant="filled" sx={{ width: "100%" }}>
                          <InputLabel
                            sx={{ background: "none", color: "gray" }}
                          >
                            Şehir
                          </InputLabel>
                          <FilledInput
                            sx={{
                              background: "none",
                              color: "white",
                              width: "100%",
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
                      color: "white",
                      fontSize: "0.7rem",
                      padding: "10px",
                    }}
                  >
                    <TextareaAutosize
                      className="bio-textarea"
                      value={formData.bio}
                      onChange={handleInputChance}
                      minRows={3}
                      maxRows={6}
                      maxLength={300}
                      placeholder="Bio"
                      name="bio"
                      sx={{
                        fontFamily: "monospace",
                        fontSize: ".9rem",
                        background: "none",
                        color: "white",
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
              <FormControl
                variant="filled"
                sx={{ width: "45%", color: "white" }}
              >
                <InputLabel sx={{ background: "none", color: "gray" }}>
                  <GitHubIcon fontSize="small" />
                  github
                </InputLabel>
                <FilledInput
                  sx={{ background: "none", color: "white", width: "100%" }}
                  value={formData?.github}
                  onChange={handleInputChance}
                  name="github"
                />
              </FormControl>

              <FormControl
                variant="filled"
                sx={{ width: "45%", color: "white" }}
              >
                <InputLabel sx={{ background: "none", color: "gray" }}>
                  {" "}
                  <LinkedInIcon fontSize="small" />
                  LinkedIn
                </InputLabel>
                <FilledInput
                  sx={{ background: "none", color: "white", width: "100%" }}
                  value={formData?.linkedin}
                  onChange={handleInputChance}
                  name="linkedin"
                />
              </FormControl>

              <FormControl
                variant="filled"
                sx={{ width: "45%", color: "white" }}
              >
                <InputLabel sx={{ background: "none", color: "gray" }}>
                  {" "}
                  <YouTubeIcon fontSize="small" />
                  Youtube
                </InputLabel>
                <FilledInput
                  sx={{ background: "none", color: "white", width: "100%" }}
                  value={formData?.youtube}
                  onChange={handleInputChance}
                  name="youtube"
                />
              </FormControl>

              <FormControl
                variant="filled"
                sx={{ width: "45%", color: "white" }}
              >
                <InputLabel sx={{ background: "none", color: "gray" }}>
                  {" "}
                  <LanguageIcon fontSize="small" />
                  Website
                </InputLabel>
                <FilledInput
                  sx={{ background: "none", color: "white", width: "100%" }}
                  value={formData?.website}
                  onChange={handleInputChance}
                  name="website"
                />
              </FormControl>

              <FormControl
                variant="filled"
                sx={{ width: "45%", color: "white" }}
              >
                <InputLabel sx={{ background: "none", color: "gray" }}>
                  {" "}
                  <XIcon fontSize="small" />
                  Twitter
                </InputLabel>
                <FilledInput
                  sx={{ background: "none", color: "white", width: "100%" }}
                  value={formData?.twitter}
                  onChange={handleInputChance}
                  name="twitter"
                />
              </FormControl>
            </CardActions>
          </Card>
        </form>
        <Button
          className="close-edit-profile-page"
          onClick={() => dispatch(setEditProfilePage(false))}
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
