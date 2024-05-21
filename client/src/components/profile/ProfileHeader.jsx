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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Modal from "../../Modals";
import EditProfile from "./EditProfile";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PropTypes from "prop-types";
import FollowActions from "../actions/FollowActions";
const webApiUrl=import.meta.env.VITE_API_BASE_URL;

const UserDetail = ({ user }) => {
  const logginedUser = useSelector(
    (state) => state.session && state.session.user
  );
  const logginedUserId = logginedUser._id;

  const navigate = useNavigate();
  const theme = useTheme();
  const isPhone = useMediaQuery("(max-width: 600px)");
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
            borderBottomRightRadius: isPhone ? "50px" : "100px",
            borderBottomLeftRadius: isPhone ? "50px" : "100px",
          }}
          src={user?.background}
        />
        <CardHeader
          avatar={
            <Box textAlign={"center"}>
              <Avatar
                src={webApiUrl + user?.avatar}
                sx={{
                  width: 150,
                  height: 150,
                  border: `5px solid ${theme.palette.primary.main}`,
                }}
                aria-label="recipe"
              >
                P
              </Avatar>

              {isPhone && logginedUser && (
                <Box marginTop="15px">
                  {user?._id === logginedUserId ? (
                    <Modal
                      buttonText="Profili Düzenle"
                      component={<EditProfile user={user} />}
                      icon={<AppRegistrationIcon />}
                    />
                  ) : (
                    <FollowActions
                      user={{ _id: user._id, isFollow: user.isFollow }}
                    />
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
                  !isPhone &&
                  logginedUser && (
                    <Box>
                      {user?._id === logginedUserId ? (
                        <Modal
                          buttonText="Profili Düzenle"
                          component={<EditProfile user={user} />}
                          icon={<AppRegistrationIcon />}
                        />
                      ) : (
                        <FollowActions
                          user={{ _id: user._id, isFollow: user.isFollow }}
                        />
                      )}
                    </Box>
                  )
                }
                title={`${user?.name} ${user?.surname}`}
                titleTypographyProps={{ color: "primary", fontSize: "1.2rem" }}
                subheader={
                  <Box>
                    <Typography
                      onClick={() => navigate(`/${user?.username}`)}
                      color="secondary"
                      sx={{
                        fontSize: "0.8rem",

                        cursor: "pointer",
                      }}
                    >
                      @{user?.username}
                    </Typography>
                    <IconButton sx={{ paddingLeft: "0" }}>
                      <LocationOnIcon fontSize="small" />
                      <Typography fontSize={15} color="primary">
                        {user?.location}
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
                {user?.bio}
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
          {/* <Typography color="primary" fontSize="small">
            {profileUserPosts?.posts.length} Gönderi
          </Typography>
          <Typography color="primary" fontSize="small">
            {user?.followers?.length} Takipçi
          </Typography>
          <Typography color="primary" fontSize="small">
            {user?.following?.length} Takip Edilen
          </Typography> */}
          {/* yeni sekmede açar */}
          <a href={"https://" + user?.socialAdress?.website} target={`_blank`}>
            <LanguageIcon fontSize="medium" color="primary" />
          </a>
          <a
            href={"https://github.com/" + user?.socialAdress?.github}
            target={`_blank`}
          >
            <GitHubIcon fontSize="medium" color="primary" />
          </a>
          <a
            href={"https://www.linkedin.com/in/" + user?.socialAdress?.linkedin}
            target={`_blank`}
          >
            <LinkedInIcon fontSize="medium" color="primary" />
          </a>
          <a
            href={"https://www.youtube.com/@" + user?.socialAdress?.youtube}
            target={`_blank`}
          >
            <YouTubeIcon fontSize="medium" color="primary" />
          </a>
          <a
            href={"https://twitter.com/" + user?.socialAdress?.twitter}
            target={`_blank`}
          >
            <XIcon fontSize="medium" color="primary" />
          </a>
        </CardActions>
      </Card>
    </>
  );
};

export default UserDetail;
UserDetail.propTypes = {
  user: PropTypes.object,
};
