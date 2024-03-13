import { follow, unfollow } from "../../redux/actions/ProfileAction";
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
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import EditProfileModal from "../../Modals/EditProfileModal";
/* eslint-disable react/prop-types */
const UserDetail = ({ profileData }) => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.authentication.user);
  const activeUserId = activeUser._id;
  const profileUSerData = useSelector((state) => state.profile.user);
  const profileUserPosts = useSelector((state) => state.posts.profilePosts);
  const navigate = useNavigate();
  const handleFollow = () => {
    activeUserId !== profileData?.user?._id &&
      (profileData?.followers?.length > 0 &&
      profileUSerData?.followers?.some((id) => id === activeUserId)
        ? dispatch(unfollow(activeUserId, profileData?.user._id, activeUser))
        : dispatch(follow(activeUserId, profileData.user._id, activeUser)));
  };

  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Card
        sx={{
          width: "100%",
          background: `${theme.palette.postBackground.default} !important`,
          boxShadow: "none",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "20%",
            objectFit: "cover",
            borderBottomRightRadius: isMobile ? "50px" : "100px",
            borderBottomLeftRadius: isMobile ? "50px" : "100px",
          }}
          src={profileData.user.background}
        />
        <CardHeader
          avatar={
            <Box textAlign={"center"}>
              <Avatar
                src={profileData.user.avatar}
                sx={{
                  width: 150,
                  height: 150,
                  border: `5px solid ${theme.palette.primary.main}`,
                }}
                aria-label="recipe"
              >
                R
              </Avatar>

              {isMobile && (
                <Box marginTop="15px">
                  {activeUser && profileUSerData._id === activeUserId ? (
                    <EditProfileModal />
                  ) : (
                    <Button aria-label="contained" onClick={handleFollow}>
                      {profileData?.followers?.length > 0 &&
                      profileUSerData?.followers?.some(
                        (id) => id === activeUserId
                      )
                        ? "Takibi Bırak"
                        : "Takip Et"}
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          }
          title={
            <Card
              sx={{
                background: "none",
                boxShadow: "none",
              }}
            >
              <CardHeader
                sx={{}}
                action={
                  !isMobile && (
                    <Box>
                      {activeUser && profileUSerData._id === activeUserId ? (
                        <EditProfileModal />
                      ) : (
                        <Button aria-label="contained" onClick={handleFollow}>
                          {profileData?.followers?.length > 0 &&
                          profileUSerData?.followers?.some(
                            (id) => id === activeUserId
                          )
                            ? "Takibi Bırak"
                            : "Takip Et"}
                        </Button>
                      )}
                    </Box>
                  )
                }
                title={`${profileData.user.name} ${profileData.user.surname}`}
                titleTypographyProps={{ color: "primary", fontSize: "1.2rem" }}
                subheader={
                  <Box>
                    <Typography
                      onClick={() => navigate(`/${profileData.user.username}`)}
                      color="secondary"
                      sx={{
                        fontSize: "0.8rem",

                        cursor: "pointer",
                      }}
                    >
                      @{profileData.user.username}
                    </Typography>
                    <IconButton sx={{ paddingLeft: "0" }}>
                      <LocationOnIcon fontSize="small" />
                      <Typography fontSize={15} color="primary">
                        {profileData.user.location}
                      </Typography>
                    </IconButton>
                  </Box>
                }
              />

              <CardContent
                sx={{
                  fontSize: "0.7rem",
                  padding: ".8rem",
                  color: `${theme.palette.primary.main}`,
                }}
              >
                {profileData.user.bio}
              </CardContent>
            </Card>
          }
        />

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Typography color="primary" fontSize="small">
            {profileData?.user?.following?.length} Takip Edilen
          </Typography>
          <Typography color="primary" fontSize="small">
            {profileData?.user?.followers?.length} Takipçi
          </Typography>
          <Typography color="primary" fontSize="small">
            {profileUserPosts?.posts.length} Gönderi
          </Typography>
          <a href={profileData?.user?.socialAdress?.website}>
            <LanguageIcon fontSize="10px" />
          </a>
          <a href={profileData?.user?.socialAdress?.github}>
            <GitHubIcon fontSize="10px" />
          </a>
          <a href={profileData?.user?.socialAdress?.linkedin}>
            <LinkedInIcon fontSize="10px" />
          </a>
          <a href={profileData?.user?.socialAdress?.youtube}>
            <YouTubeIcon fontSize="10px" />
          </a>
          <a href={profileData?.user?.socialAdress?.twitter}>
            <XIcon fontSize="10px" />
          </a>
        </CardActions>
      </Card>
    </>
  );
};

export default UserDetail;
