import {
  follow,
  getProfile,
  unfollow,
} from "../../redux/actions/ProfileAction";
import { Avatar, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import "./scss/user-detail.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
/* eslint-disable react/prop-types */
const UserDetail = ({ profileData }) => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const activeUserId = localStorage.getItem("userId");
  const activeUser = useSelector((state) => state.authentication.user);
  const profileUSerData = useSelector((state) => state.profile.user);
  const profilePosts = useSelector((state) => state.posts.profilePosts.posts);
  useEffect(() => {
    dispatch(getProfile(username));

  }, [username, dispatch],profileUSerData);
  return (
    <div id="user-detail-container">
       <div className="user-posts">
        <Typography>
          <span>{profilePosts.length} Fikir</span> 
        </Typography>
        
      </div>
      <div className="user-projects">
        <Typography>
          <span>{profilePosts.length} Proje</span> 
        </Typography>
        
      </div>
        <div className="user-follow">
       
        <Typography>
          <span>{profileData.following.length}</span> Takip
        </Typography>
      </div>
      <div id="user-detail">
        <Avatar
          src={profileData.user.avatar}
          sx={{
            width: 100,
            height: 100,
            border: "5px solid black",
          }}
        />
        <Typography>
          {profileData.user.name + " " + profileData.user.surname}
        </Typography>
        <Typography sx={{ color: "rgb(199, 189, 189)", fontSize: ".8rem" }}>
          @{profileData.user.username}
        </Typography>
        {activeUser &&
          activeUserId !== profileData.user._id &&
          (profileData.followers.length > 0 &&
         profileUSerData.followers.some((id)=>id===activeUserId) ? (
            <IconButton aria-label="settings">
              <Button
                className="follow-button"
                variant="contained"
                onClick={() =>
                  dispatch(
                    unfollow(activeUserId, profileData.user._id, activeUser)
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
                    follow(activeUserId, profileData.user._id, activeUser)
                  )
                }
              >
                Takip Et
              </Button>
            </IconButton>
          ))}
      </div>
      <div className="user-follow">
        <Typography>
          <span>{profileData.followers.length}</span> Takipçi
        </Typography>
        
      </div>
     
    </div>
  );
};

export default UserDetail;
