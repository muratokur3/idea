import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import { getFollowers, getFollowing } from "../../redux/actions/ProfileAction";
import UserList from "../users/UserList";
import * as React from "react";
import Box from "@mui/material/Box";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Follow = () => {
  const { username } = useParams();
  const followersData = useSelector((state) => state.profile.followers);
  const followingData = useSelector((state) => state.profile.following);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowers({ page: 1, hasMore: true }, username));
    dispatch(getFollowing({ page: 1, hasMore: true }, username));
  }, [username, dispatch]);

  const [value, setValue] = React.useState("following");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} centered>
          <Tab value={"following"} label="Takip Edilen" />
          <Tab value={"followers"} label="Takipçiler" />
        </TabList>
        <TabPanel value="following">
          <UserList
            data={followingData}
            getUsers={() =>
              dispatch(getFollowing(followingData.pagination, username))
            }
          />
        </TabPanel>
        <TabPanel value="followers">
          <UserList
            data={followersData}
            getUsers={() =>
              dispatch(getFollowers(followersData.pagination, username))
            }
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default Follow;
