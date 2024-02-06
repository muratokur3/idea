import { follow, unfollow } from "../../redux/actions/ProfileAction";
import { Avatar, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import "./scss/user-detail.scss";
/* eslint-disable react/prop-types */
const UserDetail = ({ user }) => {
  const dispatch = useDispatch();
  const activeUserId = localStorage.getItem("userId");
  const activeUser=JSON.parse(localStorage.getItem("user"));
  return (
    <div id="user-detail-container">
      <div id="user-detail">
          <Avatar
            src={user.avatar}
            sx={{
              width: 100,
              height: 100,
              border: "5px solid black",
            }}
          />{" "}
          <Typography>{user.name + " " + user.surname}</Typography>
          <Typography  sx={{ color: "rgb(199, 189, 189)", fontSize: ".8rem"}}>
            @{user.username}
          </Typography>
         {activeUser && activeUser.id !== user._id && user.followers>0&& user.followers.some((id)=>id===activeUserId) ? (
            <IconButton aria-label="settings">
              {activeUser && activeUser.id !== user._id && (
                <Button
                  className="follow-button"
                  variant="contained"
                  onClick={() => dispatch(unfollow(user,activeUserId, user._id))}
                >
                  Takibi Bırakww
                </Button>
              )}
            </IconButton>
          ) : (
            <IconButton aria-label="settings">
              {activeUser && activeUser.id !== user._id && (
                <Button
                  className="follow-button"
                  variant="contained"
                  onClick={() => dispatch(follow(user,activeUserId, user._id))}
                >
                  Takip Etrr
                </Button>
              )}
            </IconButton>
          )
         }
          
   
      </div>
    </div>
  );
};

export default UserDetail;
