import MobileDrawerMenu from "../menu/MobileDrawerMenu";
import logo from "../../assets/logo.png";
import { setFilter } from "../../redux/slices/FilterSlice";
import { useTheme } from "@mui/material/styles";
import { Box, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const HomeTabs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1234px)");
  const isLogin = useSelector((state) => state.authentication.isLogin);
  const dispatch = useDispatch();
  const filterName = useSelector((state) => state.filterPosts.filterName);
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

  return (
    <Box
      sx={{
        minHeight: "50px",
        borderRadius: "10px",
        backdropFilter: "blur(4px)",
        position: "sticky",
        top: "0",
        left: "0",
        zIndex: "3",
        display: scrollDir === "up" ? "flex" : "none", // Scroll yönüne göre görünürlüğü ayarla
        justifyContent: "center",
        alignItems: "center",
      }}
    >
       {isMobile && (
            <img
              src={logo}
              alt="Logo"
              style={{
                background: `${
                  theme.palette.mode === "light" ? "grey" : "none"
                }`,
                width: "25px",
                height: "25px",
                position: "absolute",
                top: "30%",
                left: "5%",
                cursor: "pointer",
              }}
            />
          )}
      {isLogin && (
        <Tabs
          value={filterName}
          centered
        >
         
          <Tab
            value={"all"}
            label="kişilerim"
            sx={{ color: theme.palette.primary.main }}
            onClick={() => dispatch(setFilter("all"))}
          />
          <Tab
            value={"privateme"}
            label="etiketlerim"
            sx={{ color: theme.palette.primary.main }}
            onClick={() => dispatch(setFilter("privateme"))}
          />

        </Tabs>
      )}
      {isMobile && <MobileDrawerMenu />}
    </Box>
  );
};

export default HomeTabs;
