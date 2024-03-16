import { Fragment, useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from "@mui/material";
import { useParams } from "react-router-dom";
import { getFollowers, getFollowing } from "../../redux/actions/ProfileAction";
import { useTheme } from "@mui/material/styles";

const Follow = () => {
  const theme = useTheme();
  const { username } = useParams();
  const profile = useSelector((state) => state.profile);
  const [follow, setFollow] = useState("following");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowers(username));
    dispatch(getFollowing(username));
  }, [username, dispatch, follow, setFollow]);
  return (
    <Fragment>
      <Tabs
        value={follow}
        id="tabs"
        centered
        textColor={theme.palette.mode === "dark" ? "inherit" : "primary"}
      >
        <Tab
          value={"following"}
          label={`Takip Edilenler ${profile.following.length}`}
            sx={{ color: theme.palette.primary.main }}
            onClick={() => setFollow("following")}
        />
        <Tab
          value={"followers"}
          label={`Takipçiler ${profile.followers.length}`}
            sx={{ color: theme.palette.primary.main }}
            onClick={() => setFollow("followers")}
        />
      </Tabs>
      {follow === "following" &&
        profile.following.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      {follow === "followers" &&
        profile.followers.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
    </Fragment>
  );
};

export default Follow;
