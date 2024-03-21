import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Box, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import MobileBottomNavigation from "../components/menu/MobileBottomNavigation";

const ClientLayout = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1234px)");

  const Container = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  });

  const Content = styled(Box)({
    display: "flex",
    width: (isPhone || isTablet) ? "90%" : "55%",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  });
  const StyledSidebar = styled(Box)({
    width:isTablet ? "10%" : "20%",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  });

  const StyledOutlet = styled(Box)({
    width: isPhone ?"100%": isTablet ? "90%" : "80%",
    minHeight: "100vh",
    padding:"0 1rem",
    backgroundColor: theme.palette.background.default,
  });

  return (
    <>
      {/* <CssBaseline /> */}
      <Container>
        <Content>
        {!isPhone && (
          <StyledSidebar>
            <Sidebar />
          </StyledSidebar>
        )}
        <StyledOutlet>

          <Outlet />
        </StyledOutlet>
        </Content>
        {isPhone && <MobileBottomNavigation />}
      </Container>
    </>
  );
};

export default ClientLayout;
