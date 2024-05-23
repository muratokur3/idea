import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HomeIcon from "@mui/icons-material/Home";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";
import Modal from "../../Modals";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CreateOrUpdatePost from "../post/CreateOrUpdatePost";
import styled from "@emotion/styled";
const Menu = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(
    (state) => state.session && state.session.authenticated
  );
  const username = useSelector(
    (state) => state.session && state.session.user.username
  );
  const location = useLocation();
  const locPath = location.pathname;

  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1234px)");
  const StyledListItemText = styled(ListItemText)({
    color: theme.palette.primary.main,
    display: isTablet ? "none" : "block",
  });
const StyledListItemIcon = styled(ListItemIcon)({
  display:  "flex",
  justifyContent: "center",
});
  return (
    <Box sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap:isMobile?"0.5rem":"1.5rem",
        }}
      >
        <ListItem
          disablePadding
          className={locPath === "/" ? "active" : ""}
         
        >
          <ListItemButton onClick={() => navigate("/")}>
            <StyledListItemIcon >
              <HomeIcon />
            </StyledListItemIcon>
            <StyledListItemText primary="Anasayfa" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          className={locPath === "/explore" ? "active" : ""}
         
        >
          <ListItemButton onClick={() => navigate("/explore")} >
          <StyledListItemIcon >

              <SearchIcon />
            </StyledListItemIcon>
            <StyledListItemText
              primary="Keşfet"
              primaryTypographyProps={{ color: theme.palette.primary.main }}
            />
          </ListItemButton>
        </ListItem>

        {isLoggedIn && (
          <>
            <ListItem
              disablePadding
              className={locPath === "/favorite" ? "active" : ""}
             
            >
              <ListItemButton onClick={() => navigate("/favorite")}>
                <StyledListItemIcon>
                  <StarBorderIcon />
                </StyledListItemIcon>
                <StyledListItemText
                  primary="Favoriler"
                  primaryTypographyProps={{ color: theme.palette.primary.main }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              className={locPath === "/MyLikes" ? "active" : ""}
             
            >
              <ListItemButton onClick={() => navigate("/MyLikes")}>
                <StyledListItemIcon>
                  <FavoriteBorderIcon />
                </StyledListItemIcon>
                <StyledListItemText
                  primary="Beğeni"
                  primaryTypographyProps={{ color: theme.palette.primary.main }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              className={locPath === `/${username}` ? "active" : ""}
             
            >
              <ListItemButton onClick={() => navigate(`/${username}`)}>
                <StyledListItemIcon>
                  <PermIdentityIcon />
                </StyledListItemIcon>
                <StyledListItemText
                  primary="Profilim"
                  primaryTypographyProps={{ color: theme.palette.primary.main }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              className={locPath === "/settings" ? "active" : ""}
             
            >
              <ListItemButton onClick={() => navigate("/settings")}>
                <StyledListItemIcon>
                  <SettingsIcon />
                </StyledListItemIcon>
                <StyledListItemText
                  primary="Ayarlar"
                  primaryTypographyProps={{ color: theme.palette.primary.main }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      {isLoggedIn && (
        <Modal buttonText={isTablet?"+":"Yeni Fikir"} component={<CreateOrUpdatePost/>} icon={<DriveFileRenameOutlineIcon/>} />
      )}
    </Box>
  );
};

export default Menu;
