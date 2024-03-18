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
import {useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import {useTheme } from "@mui/material/styles";
import EditProfileModal from "../../Modals/EditProfileModal";
import Modal from "../../Modals";
import EditProfile from "./EditProfile";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PropTypes from "prop-types";
import FollowActions from "../actions/FollowActions";

const UserDetail = ({ profileData }) => {
  const logginedUser = useSelector((state) => state.session && state.session.user);
  const logginedUserId = logginedUser._id;

  const profileUserPosts = useSelector((state) => state?.posts?.profilePosts);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1234px)");
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
            height: "35vh",
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
                  {logginedUser && profileData._id === logginedUserId ? (
                    <EditProfileModal />
                  ) : (
                 <FollowActions toFollowUserId={profileData?._id}/>
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
                  !isMobile &&
                  logginedUser &&(
                    <Box>
                      

                      {logginedUser && profileData.user._id === logginedUserId ? (
                       <Modal buttonText="Profili Düzenle" component={<EditProfile user={profileData.user} />} icon={<AppRegistrationIcon/>}/>
                      ) : (
                        <FollowActions toFollowUserId={profileData?.user?._id}/>
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
            {profileUserPosts?.posts.length} Gönderi
          </Typography>
          <Typography color="primary" fontSize="small">
            {profileData?.user?.followers?.length} Takipçi
          </Typography>
          <Typography color="primary" fontSize="small">
            {profileData?.user?.following?.length} Takip Edilen
          </Typography>
          <a href={profileData?.user?.socialAdress?.website}>
            <LanguageIcon fontSize="medium" />
          </a>
          <a href={profileData?.user?.socialAdress?.github}>
            <GitHubIcon fontSize="medium" />
          </a>
          <a href={profileData?.user?.socialAdress?.linkedin}>
            <LinkedInIcon fontSize="medium" />
          </a>
          <a href={profileData?.user?.socialAdress?.youtube}>
            <YouTubeIcon fontSize="medium" />
          </a>
          <a href={profileData?.user?.socialAdress?.twitter}>
            <XIcon fontSize="medium" />
          </a>
        </CardActions>
      </Card>
    </>
  );
};

export default UserDetail;
UserDetail.propTypes = {
  profileData: PropTypes.object,
};
