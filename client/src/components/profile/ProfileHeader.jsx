import {
  follow,
  unfollow,
} from "../../redux/actions/ProfileAction";
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
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import "./scss/profile-header.scss";
import { useNavigate } from "react-router-dom";
import EditProfile from "../../Modals/EditProfile";
import { setEditProfilePage } from "../../redux/slices/UiSlice";
/* eslint-disable react/prop-types */
const UserDetail = ({ profileData }) => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.authentication.user);
  const activeUserId = activeUser._id;
  const profileUSerData = useSelector((state) => state.profile.user);
  const profileUserPosts = useSelector((state) => state.posts.profilePosts);
  const navigate = useNavigate();
  const editProfilePage = useSelector((state) => state.ui.editProfilePage);

  return (
    <>
      {editProfilePage && <EditProfile user={profileData.user} />}

      <Card id="user-detail-card">
        <img id="background-image" src={profileData.user.background} />
        <div id="background-image-opacity"></div>
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
                      <Button
                        variant="contained"
                        sx={{ fontSize: "0.7rem" }}
                        onClick={() => dispatch(setEditProfilePage(true))}
                      >
                        Profili Düzenle
                      </Button>
                    ) : (
                      activeUserId !== profileData?.user?._id &&
                      (profileData?.followers?.length > 0 &&
                      profileUSerData?.followers?.some(
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
                                  profileData?.user._id,
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
                      <Typography fontSize={15}>
                        {profileData.user.location}
                      </Typography>
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
                <p style={{ fontSize: "13px" }}>{profileData.user.bio}</p>
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
          <Typography>
          {profileData?.user?.following?.length} Takip Edilen
          </Typography>
         <Typography>
          {profileData?.user?.followers?.length} Takipçi
         </Typography>
          <Typography>
          {profileUserPosts?.posts.length} Gönderi
          </Typography>
          <a href={profileData?.user?.socialAdress?.website}>
            <LanguageIcon fontSize="small" />
          </a>
          <a href={profileData?.user?.socialAdress?.github}>
            <GitHubIcon fontSize="small" />
          </a>
          <a href={profileData?.user?.socialAdress?.linkedin}>
            <LinkedInIcon fontSize="small" />
          </a>
          <a href={profileData?.user?.socialAdress?.youtube}>
            <YouTubeIcon fontSize="small" />
          </a>
          <a href={profileData?.user?.socialAdress?.twitter}>
            <XIcon fontSize="small" />
          </a>
        </CardActions>
      </Card>
    </>
  );
};

export default UserDetail;
