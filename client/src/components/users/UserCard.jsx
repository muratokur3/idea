import { Avatar, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import { green } from "@mui/material/colors";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import Followactions from "../actions/FollowActions";
import { useTheme } from "@mui/material/styles";
const webApiUrl=import.meta.env.VITE_API_BASE_URL;

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: "100%",
        background: `${theme.palette.postBackground.default}`,
        marginTop: "10px",
        borderRadius: "10px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={webApiUrl+user?.avatar}
            sx={{ bgcolor: green[700],cursor:"pointer" }}
            aria-label="recipe"
            onClick={() => navigate(`/${user?.username}`)}
          >
            {user?.name[0]}
          </Avatar>
        }
        action={
          <Followactions user={{ _id: user._id, isFollow: user.isFollow }} />
        }
        title={
          <Typography
          onClick={() => navigate(`/${user?.username}`)}
          sx={{ fontSize: "1rem", cursor: "pointer" }}
        >
          {user?.name} {user?.surname}
        </Typography>}
        titleTypographyProps={{ fontSize: "1rem", color: "primary" }}
        subheader={
          <Typography
            onClick={() => navigate(`/${user?.username}`)}
            color={"secondary"}
            sx={{ fontSize: "0.8rem", cursor: "pointer" }}
          >
            @{user?.username}
          </Typography>
        }
      />

      <CardContent
        sx={{
          fontSize: "0.7rem",
          padding: "10px",
        }}
      >
        {" "}
        <Typography color="primary" sx={{ fontSize: "10px" }}>
          {user?.followers.length} Takipçi {user?.following.length} Takip Edilen
        </Typography>
        <Typography color="primary" fontSize={".8rem"}>
          {user?.bio?.slice(0, 80)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};
