import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Project from "../../components/project";
import Follow from "../../components/profile/Follow";
import ProfileFavorites from "../profile/ProfileFavorites";
import ProfilePosts from "../profile/ProfilePosts";
export default function LabTabs() {
  const [value, setValue] = React.useState("posts");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} centered>
          <Tab value={"posts"} label="Fikirler" />
          <Tab value={"project"} label="Projeler" />
          <Tab value={"favorite"} label="Favoriler" />
          <Tab value={"follow"} label="Takip" />
        </TabList>
        <TabPanel value="posts">
          <ProfilePosts />
        </TabPanel>
        <TabPanel value="project">
          <Project />
        </TabPanel>
        <TabPanel value="favorite">
          <ProfileFavorites />
        </TabPanel>
        <TabPanel value="follow">
          <Follow />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
