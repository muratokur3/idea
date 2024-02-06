import { Avatar, Button, CardContent, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { follow, unfollow } from "../../redux/actions/ProfileAction";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeUserId = localStorage.getItem("userId");
  const activeUser = JSON.parse(localStorage.getItem("user"));
 

  return (
    <Card
      sx={{
        maxWidth: "100%",
        backgroundColor: "rgba(10, 9, 9, 0.713)",
        marginTop: "10px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={user.avatar}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        action={
          user.followers.some((u) => u === activeUser.id) ? (
            <IconButton aria-label="settings">
              {activeUser && activeUser.id !== user._id && (
                <Button
                  className="follow-button"
                  variant="contained"
                  onClick={() => dispatch(unfollow(activeUser,activeUserId, user._id))}
                >
                  Takibi Bırak
                </Button>
              )}
            </IconButton>
          ) : (
            <IconButton aria-label="settings">
              {activeUser && activeUser.id !== user._id && (
                <Button
                  className="follow-button"
                  variant="contained"
                  onClick={() => dispatch(follow(activeUser,activeUserId, user._id))}
                >
                  Takip Et
                </Button>
              )}
            </IconButton>
          )
        }
        title={`${user.name} ${user.surname}`}
        titleTypographyProps={{ fontSize: "1rem" }}
        subheader={
          <Typography
            onClick={() => navigate(`/${user.username}`)}
            sx={{ fontSize: "0.8rem", color: "gray", cursor: "pointer" }}
          >
            @{user.username}
          </Typography>
        }
      />
      <CardContent
        sx={{
          color: "white",
          fontSize: "0.7rem",
          padding: "10px",
        }}
      >
        {user.followers.length} Takipçi {user.following.length} Takip Edilen
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default UserCard;
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};
