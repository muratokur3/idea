import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Auth from "../Modals/Auth";
import NewPostPage from "../Modals/NewPostPage";
import { Box, CssBaseline } from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from '@mui/material/styles';



const ClientLayout = () => {
   const theme = useTheme();
  const StyledLayoutContainer = styled(Box)({
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor:theme.palette.background.default,
  });

  const StyledLayoutContent = styled(Box)({
    display: "flex",
    width: "60%",
    minHeight: "100vh",
    backgroundColor:theme.palette.background.default,
  });
  return (
   <>
    {/* <CssBaseline /> */}
    <StyledLayoutContainer>
      <StyledLayoutContent>
      <Sidebar sx={{width: "25%", padding: 1 }}/>
      <Box sx={{ flexGrow: 1 }}>
        {<Auth />}
        {<NewPostPage />}
      </Box>
      <Box sx={{width: "75%", padding: 3}}>
        <Outlet />
      </Box>
      </StyledLayoutContent>
    </StyledLayoutContainer>
   </>
  );
};


export default ClientLayout;























// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Auth from "../Modals/Auth";
// import NewPostPage from "../Modals/NewPostPage";
// import "./scss/client-layout.scss";

// const ClientLayout = () => {

//   return (
//     <div id="layout-container">
//       {<Auth />}
//       {<NewPostPage />}
//       <Sidebar />
//       <div id="layout-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default ClientLayout;
