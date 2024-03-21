import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import SearchBar from "../components/explore/SearchBar";

const StyledExploreContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});


const Explore = () => {
 
  return (
    <StyledExploreContainer>
     <SearchBar />
      <Outlet />
    </StyledExploreContainer>
  );
};

export default Explore;
