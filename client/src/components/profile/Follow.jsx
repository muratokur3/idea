
import { Fragment, useEffect, useState } from "react";
import UserCard from "./UserCard"
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from "@mui/material";
import { useParams } from "react-router-dom";
import { getFollowers, getFollowing } from "../../redux/actions/ProfileAction";

const Follow = () => {
  const{username}=useParams();
  const profile=useSelector((state)=>state.profile);
  const [follow,setFollow]=useState("following");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowers(username));
    dispatch(getFollowing(username));
  }, [username, dispatch, follow]);
  return (
    <Fragment>
      <Tabs value={follow} id="tabs" centered textColor="white">
            <Tab
              value={"following"}
              label={`Takip Edilenler ${profile.following.length}`}
              onClick={() => setFollow("following")}
            />
            <Tab
              value={"followers"}
              label={`Takipçiler ${profile.followers.length}`}
              onClick={() => setFollow("followers")}
            />
          </Tabs>
      <ul>
      {follow==="following"&&profile.following.map((user)=>(
        <UserCard key={user._id} user={user}/>
      ))}
      {follow==="followers"&&profile.followers.map((user)=>(
        <UserCard key={user._id} user={user}/>
      ))}
    </ul>
    </Fragment>
    
  )
}

export default Follow