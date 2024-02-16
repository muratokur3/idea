import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useNavigate } from "react-router-dom";
import "./explore.scss";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Fade,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../redux/actions/SearchActions";
import { setSearch } from "../redux/slices/SearchSlice";
const Explore = () => {
  const [searchText, setSearchText] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [resultBox, setResultBox] = useState(false);
  const searchData = useSelector((state) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(getSearchResults({ text: searchText, searchFilter }));
    setResultBox(true);
  };
  useEffect(() => {
    dispatch(setSearch({ users: [], hashtags: [] }));
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let blurTimeout;
  const resultItemHashtags = (hashtag) => {
    return (
      <Card
        sx={{
          borderRadius: "10px",
          backgroundColor: "transparent",
          width: "100%",
        }}
        onClick={() => {
          navigate(`${hashtag.name}`);
          setResultBox(false);
        }}
      >
        <CardActionArea>
          <CardContent sx={{ display: "flex", gap: "10%" }}>
            <Typography gutterBottom component="div" color="white">
              {hashtag.name}
            </Typography>
            <Typography color="white">{hashtag.postCount} posts</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  const resultItemUsers = (user) => {
    return (
      <Card
        sx={{
          maxWidth: "100%",
          backgroundColor: "rgba(10, 9, 9, 0.713)",
          marginTop: "10px",
          borderRadius: "10px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={user.avatar}
              sx={{ bgcolor: "green" }}
              aria-label="recipe"
            >
              R
            </Avatar>
          }
          action={
            <Typography sx={{ fontSize: "10px", color: "white" }}>
              {user?.followers?.length} Takipçi {user?.following?.length} Takip
              Edilen
            </Typography>
          }
          title={`${user.name} ${user.surname}`}
          titleTypographyProps={{ fontSize: "1rem" }}
          subheader={
            <Typography
              onClick={() => navigate(`/${user.username}`)}
              sx={{ fontSize: "0.8rem", color: "gray", cursor: "pointer" }}
            >
              @{user.username}
            </Typography>
          }
        />
      </Card>
    );
  };
  return (
    <div id="explore-container">
      <div id="search-box">
        <Paper
          component="form"
          sx={{
            background: "none",
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100px",
            position: "relative",
          }}
        >
          

          <IconButton sx={{ p: "10px" }} aria-label="menu"
            id="long-button"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            PaperProps={{
              style: {
                backgroundColor: "black",
                color: "white",
                padding: "5px",
              },
            }}
          >
            <RadioGroup value={searchFilter}>
              <MenuItem>
                <Radio value="all" onChange={() => setSearchFilter("all")} /> Tümü
              </MenuItem>
              <MenuItem>
                <Radio
                  value="users"
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
                Kullanıcı
              </MenuItem>
              <MenuItem>
                <Radio
                  value="hashtags"
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
                Hashtag
              </MenuItem>
            </RadioGroup>
          </Menu>

          <InputBase
            sx={{ ml: 1, flex: 1, color: "white" }}
            placeholder="Kişi konu veya hashtag ara"
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch();
            }}
            onFocus={() => {
              clearTimeout(blurTimeout);
              setResultBox(true);
            }}
            onBlur={() =>
              (blurTimeout = setTimeout(() => setResultBox(false), 200))
            }
          />

          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Button onClick={handleSearch}>
              <SearchIcon />
            </Button>
          </IconButton>

          <Box
            sx={{
              display: resultBox ? "flex" : "none",
              flexDirection: "column",
              gap: "10px",
              position: "absolute",
              top: "100%",
              left: "0",
              width: "90%",
              marginLeft: "5%",
              height: "auto",
              background: "black",
              border: "1px solid gray",
              borderRadius: "5px",
              color: "white",
              zIndex: "100",
              padding:
                (searchData?.users?.length > 0 ||
                  searchData?.hashtags?.length > 0) &&
                "10px",
            }}
          >
            {searchData?.users?.length > 0 && (
              <Typography sx={{ color: "white", textAlign: "center" }}>
                Kullanıcılar
              </Typography>
            )}
            {searchData?.users?.map((user) => resultItemUsers(user))}
            {searchData?.hashtags?.length > 0 && (
              <Typography sx={{ color: "white", textAlign: "center" }}>
                Hashtags
              </Typography>
            )}{" "}
            {searchData?.hashtags
              ?.slice(0, 5)
              .map((hashtag) => resultItemHashtags(hashtag))}
          </Box>
        </Paper>
      </div>
      <Outlet />
    </div>
  );
};

export default Explore;
