/* eslint-disable react/prop-types */
import "./scss/user-detail.scss";
import { Avatar, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { followUser } from "../../redux/actions/ProfileAction";
import { useEffect, useState } from "react";
const UserDetail = ({ user }) => {
  const dispatch = useDispatch();
  const activeUserId = localStorage.getItem("userId");
  const activeUser=JSON.parse(localStorage.getItem("user"));
  const [isFollowed, setIsFollowed] = useState(false);
  const isFollow =async () => {
  
      activeUser &&
      user &&
     setIsFollowed(user.followers.some((u) => u === activeUser.id )) 
  };

  useEffect(() => {
    isFollow();
  }, [user]
  );

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
         {activeUser && activeUser.id !== user._id && (
           <Button
           className="follow-button"
           variant="contained"
          
           onClick={() => dispatch(followUser(activeUserId, user._id))}
         >
           {isFollowed ? "Takibi Bırak" : "Takip Et"}
         </Button>)}
          
   
      </div>
    </div>
  );
};

export default UserDetail;
