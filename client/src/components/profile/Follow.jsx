
import { Fragment, useEffect, useState } from "react";
import UserCard from "./UserCard"
import { useDispatch, useSelector } from "react-redux";
import { getFollowers, getFollowing } from "../../redux/actions/UserActions";
import { Tab, Tabs } from "@mui/material";

const Follow = () => {
  const username=localStorage.getItem("username");
  const users=useSelector((state)=>state.users);
  const [follow,setFollow]=useState("following");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowers(username));
    dispatch(getFollowing(username));
  }, [username]);
  return (
    <Fragment>
      <Tabs value={follow} id="tabs" centered textColor="white">
            <Tab
              value={"following"}
              label="Takip Edilenler"
              onClick={() => setFollow("following")}
            />
            <Tab
              value={"followers"}
              label="Takipçiler"
              onClick={() => setFollow("followers")}
            />
          </Tabs>
      <ul>
      {follow==="following"&&users.following.map((user)=>(
        <UserCard key={user._id} user={user}/>
      ))}
      {follow==="followers"&&users.followers.map((user)=>(
        <UserCard key={user._id} user={user}/>
      ))}
    </ul>
    </Fragment>
    
  )
}

export default Follow