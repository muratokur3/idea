import { follow, unfollow } from "../../redux/actions/ProfileAction";
import { Avatar, Button, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.authentication.user);

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
                  onClick={() =>
                    dispatch(unfollow(activeUser._id, user._id, user))
                  }
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
                  onClick={() => dispatch(follow(activeUser._id, user._id, user))}
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
      > <Typography sx={{ fontSize: "10px",color:"white" }}>
           {user.followers.length} Takipçi {user.following.length} Takip
           Edilen
         </Typography>
        <p style={{ fontSize: "13px" }}>
         {user?.bio?.slice(0, 80)}
        </p>
      </CardContent>
    </Card>
  );
};

export default UserCard;
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};
