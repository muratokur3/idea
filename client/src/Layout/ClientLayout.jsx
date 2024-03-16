import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Box, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import MobileBottomNavigation from "../components/menu/MobileBottomNavigation";

const ClientLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1234px)");

  const Container = styled(Box)({
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  });
  const Content = styled(Box)({
    display: "flex",
    width: isMobile ? "100%" : "60%",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  });

  return (
    <>
      {/* <CssBaseline /> */}
      <Container>
        <Content>
          {!isMobile && <Sidebar sx={{ width: "25%" }} />}
          <Box sx={{ width: isMobile ? "100%" : "75%" }}>
            <Outlet />
          </Box>
        </Content>
        {isMobile && <MobileBottomNavigation />}
      </Container>
    </>
  );
};

export default ClientLayout;
