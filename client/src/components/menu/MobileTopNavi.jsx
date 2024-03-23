import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import MobileDrawerMenu from './MobileDrawerMenu';
import { useTheme } from "@mui/material/styles";
import SearchBar from '../explore/SearchBar';
import { Box } from '@mui/material';
function ResponsiveAppBar() {
  const [scrollDir, setScrollDir] = useState("up");

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const theme=useTheme();
  

  
  return (
    <AppBar position={scrollDir === "up" ? "fixed" : "static" }>
    {/* AppBar içeriği */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img
              src={logo}
              alt="Logo"
              style={{
                background: `${
                  theme.palette.mode === "light" ? "grey" : "none"
                }`,
                width: "25px",
                height: "25px",
                top: "30%",
                left: "5%",
                cursor: "pointer",
              }}
            />
        <MobileDrawerMenu/>
        </Toolbar>
            <Box>
            <SearchBar/>

            </Box>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;