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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { setEditProfilePage } from "../../redux/slices/UiSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./edit-profile.scss";
import { ubdateProfile } from "../../redux/actions/ProfileAction";
const EditProfile = (user) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    bio: "",
    location: "",
    avatar: "",
    background: "",
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
      avatar: user.user.avatar,
      background: user.user.background,
      github: user.user.socialAdress.github,
      linkedin: user.user.socialAdress.linkedin,
      youtube: user.user.socialAdress.youtube,
      website: user.user.socialAdress.website,
      twitter: user.user.socialAdress.twitter,
    });
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
      avatar: formData.avatar,
      background: formData.background,
      socialAdress: {
        github: formData.github,
        linkedin: formData.linkedin,
        youtube: formData.youtube,
        website: formData.website,
        twitter: formData.twitter,
      },
    };

    dispatch(ubdateProfile(data));
  };

  return (
    <div id="edit-profile-page">
      <div
        id="modal-overlay"
        onClick={() => dispatch(setEditProfilePage(false))}
      ></div>
      <div id="box-edit-profile">
        <form onSubmit={handleSubmit} id="edit-profile-form">
          <Card id="user-detail-card">
            <img id="background-image" src={user.user.background} />
            <CardHeader
              sx={{
                background: "none",
                color: "white",
                display: "flex",
                alignItems: "start",
              }}
              avatar={
                <Avatar
                  src={user.user.avatar}
                  sx={{
                    width: 150,
                    height: 150,
                    border: "5px solid black",
                  }}
                  aria-label="recipe"
                >
                  R
                </Avatar>
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
                      maxRows={10}
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
                justifyContent: "space-around",
                margin: "30px 0",
              }}
            >
              <FormControl
                variant="filled"
                sx={{ width: "20%", color: "white" }}
              >
                <InputLabel sx={{ background: "none", color: "gray" }}>
                  {" "}
                  <GitHubIcon fontSize="small" />
                  github
                </InputLabel>
                <FilledInput
                  sx={{ background: "none", color: "white", width: "100%" }}
                  value={formData.github}
                  onChange={handleInputChance}
                  name="github"
                />
              </FormControl>

              <FormControl
                variant="filled"
                sx={{ width: "20%", color: "white" }}
              >
                <InputLabel sx={{ background: "none", color: "gray" }}>
                  {" "}
                  <LinkedInIcon fontSize="small" />
                  LinkedIn
                </InputLabel>
                <FilledInput
                  sx={{ background: "none", color: "white", width: "100%" }}
                  value={formData.linkedin}
                  onChange={handleInputChance}
                  name="linkedin"
                />
              </FormControl>

              <FormControl
                variant="filled"
                sx={{ width: "20%", color: "white" }}
              >
                <InputLabel sx={{ background: "none", color: "gray" }}>
                  {" "}
                  <YouTubeIcon fontSize="small" />
                  Youtube
                </InputLabel>
                <FilledInput
                  sx={{ background: "none", color: "white", width: "100%" }}
                  value={formData.youtube}
                  onChange={handleInputChance}
                  name="youtube"
                />
              </FormControl>

              <FormControl
                variant="filled"
                sx={{ width: "20%", color: "white" }}
              >
                <InputLabel sx={{ background: "none", color: "gray" }}>
                  {" "}
                  <LanguageIcon fontSize="small" />
                  Website
                </InputLabel>
                <FilledInput
                  sx={{ background: "none", color: "white", width: "100%" }}
                  value={formData.website}
                  onChange={handleInputChance}
                  name="website"
                />
              </FormControl>

              <FormControl
                variant="filled"
                sx={{ width: "20%", color: "white" }}
              >
                <InputLabel sx={{ background: "none", color: "gray" }}>
                  {" "}
                  <XIcon fontSize="small" />
                  Twitter
                </InputLabel>
                <FilledInput
                  sx={{ background: "none", color: "white", width: "100%" }}
                  value={formData.twitter}
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
