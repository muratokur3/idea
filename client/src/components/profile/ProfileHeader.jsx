import {
  follow,
  getProfile,
  unfollow,
} from "../../redux/actions/ProfileAction";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
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
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import "./scss/user-detail.scss";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
/* eslint-disable react/prop-types */
const UserDetail = ({ profileData }) => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const activeUserId = localStorage.getItem("userId");
  const activeUser = useSelector((state) => state.authentication.user);
  const profileUSerData = useSelector((state) => state.profile.user);
  const background = "https://picsum.photos/1024/500?random=1";
  const navigate = useNavigate();
  useEffect(
    () => {
      dispatch(getProfile(username));
    },
    [username, dispatch],
    profileUSerData
  );
  return (
    <>
      <Card id="user-detail-card">
        <img id="background-image" src={background} />
        <CardHeader
          avatar={
            <Avatar
              src={profileData.user.avatar}
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
                  <box>
                    {activeUser && profileUSerData._id === activeUserId ? (
                      <Button variant="contained" sx={{ fontSize: "0.7rem" }}>
                        Profili Düzenle
                      </Button>
                    ) : (
                      activeUserId !== profileData.user._id &&
                      (profileData.followers.length > 0 &&
                      profileUSerData.followers.some(
                        (id) => id === activeUserId
                      ) ? (
                        <IconButton aria-label="settings">
                          <Button
                            className="follow-button"
                            variant="contained"
                            onClick={() =>
                              dispatch(
                                unfollow(
                                  activeUserId,
                                  profileData.user._id,
                                  activeUser
                                )
                              )
                            }
                          >
                            Takibi Bırak
                          </Button>
                        </IconButton>
                      ) : (
                        <IconButton aria-label="settings">
                          <Button
                            className="follow-button"
                            variant="contained"
                            onClick={() =>
                              dispatch(
                                follow(
                                  activeUserId,
                                  profileData.user._id,
                                  activeUser
                                )
                              )
                            }
                          >
                            Takip Et
                          </Button>
                        </IconButton>
                      ))
                    )}
                  </box>
                }
                title={`${profileData.user.name} ${profileData.user.surname}`}
                titleTypographyProps={{ fontSize: "1rem" }}
                subheader={
                  <Box>
                    <Typography
                      onClick={() => navigate(`/${profileData.user.username}`)}
                      sx={{
                        fontSize: "0.8rem",
                        color: "gray",
                        cursor: "pointer",
                      }}
                    >
                      @{profileData.user.username}
                    </Typography>
                    <IconButton sx={{ paddingLeft: "0" }}>
                      <LocationOnIcon fontSize="small" />
                      <Typography fontSize={15}>İstanbul</Typography>
                    </IconButton>
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
                <p style={{ fontSize: "13px" }}>
                  {profileData.bio} 🖥️ 😍bir yazılım geliştirici ve tasarımcıyım
                  💻👨🏻‍💻😅🔆
                </p>
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
          <a href={profileData.socialAdress.github}>
            <GitHubIcon fontSize="small" />
          </a>
          <a href={profileData.socialAdress.linkedin}></a>{" "}
          <LinkedInIcon fontSize="small" />
          <a href={profileData.socialAdress.youtube}></a>{" "}
          <YouTubeIcon fontSize="small" />
          <a href={profileData.socialAdress.website}></a>{" "}
          <LanguageIcon fontSize="small" />
          <a href={profileData.socialAdress.twitter}></a>{" "}
          <XIcon fontSize="small" />
        </CardActions>
      </Card>
    </>
  );
};

export default UserDetail;
