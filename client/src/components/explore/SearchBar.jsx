import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Menu, Fade, MenuItem, Radio, RadioGroup } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../../redux/actions/SearchActions";
import { setSearch } from "../../redux/slices/SearchSlice";
import { useTheme } from "@mui/material/styles";
import FollowHashtags from "../actions/FollowHashtags";
const StyledSearchBox = styled(Paper)({
  background: "none",
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100px",
  position: "relative",
  borderBottom: "1px solid #75707068",
});

const SearchBar = () => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [resultBox, setResultBox] = useState(false);
  const searchData = useSelector((state) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginedUser = useSelector((state) => state.session && state.session.user);
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
  const resultItemHashtags = (hashtag, i) => {
    return (
      <Card
        key={i}
        sx={{
          borderRadius: "10px",
          background: `${theme.palette.postBackground.default}`,
          width: "100%",
        }}
        onClick={() => {
          navigate(`${hashtag.name}`);
          setResultBox(false);
        }}
      >
        <CardActionArea>
          <CardContent
            sx={{
              display: "flex",
              gap: "10%",
              justifyContent: "space-between",
            }}
          >
            <Typography gutterBottom component="div" color="primary">
              #{hashtag.name}
            </Typography>
            <Typography color="grey">{hashtag.postCount} posts</Typography>

            {loginedUser._id && <FollowHashtags hashtagName={hashtag.name} />}
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  const resultItemUsers = (user, i) => {
    return (
      <Card
        key={i}
        sx={{
          maxWidth: "100%",
          background: `${theme.palette.postBackground.default}`,
          marginTop: "5px",
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
            <Typography color="primary" sx={{ fontSize: "10px" }}>
              {user?.followers?.length} Takipçi {user?.following?.length} Takip
              Edilen
            </Typography>
          }
          title={`${user.name} ${user.surname}`}
          titleTypographyProps={{ fontSize: "1rem", color: "primary" }}
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
    <StyledSearchBox>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ p: "10px" }}
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
        transitioncomponent={Fade}
        PaperProps={{
          style: {
            padding: "5px",
            borderRadius: "15px",
          },
        }}
      >
        <RadioGroup value={searchFilter} color="primary">
          <MenuItem>
            <Radio value="all" onChange={() => setSearchFilter("all")} />
            <Typography color="primary">Tümü</Typography>
          </MenuItem>
          <MenuItem>
            <Radio value="users" onChange={(e) => setSearchFilter(e.target.value)} />
            <Typography color="primary">Kullanıcı</Typography>
          </MenuItem>
          <MenuItem>
            <Radio value="hashtags" onChange={(e) => setSearchFilter(e.target.value)} />
            <Typography color="primary">Hashtag</Typography>
          </MenuItem>
        </RadioGroup>
      </Menu>

      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          "& .MuiInputBase-input": {
            color: theme.palette.primary.main,
          },
        }}
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

      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>

      <Box
        sx={{
          display: resultBox ? "flex" : "none",
          flexDirection: "column",
          gap: "5px",
          position: "absolute",
          top: "100%",
          left: "0",
          width: "90%",
          marginLeft: "5%",
          height: "auto",
          background: `${theme.palette.background.default}`,
          border: "1px solid gray",
          borderRadius: "5px",
          color: "white",
          zIndex: "3",
          padding:
            (searchData?.users?.length > 0 ||
              searchData?.hashtags?.length > 0) &&
            "10px",
        }}
      >
        {searchData?.users?.length > 0 && (
          <Typography color="primary" sx={{ textAlign: "center" }}>
            Kullanıcılar
          </Typography>
        )}
        {searchData?.users?.map((user, i) => resultItemUsers(user, i))}
        {searchData?.hashtags?.length > 0 && (
          <Typography color="primary" sx={{ textAlign: "center" }}>
            Hashtags
          </Typography>
        )}{" "}
        {searchData?.hashtags
          ?.slice(0, 5)
          .map((hashtag, i) => resultItemHashtags(hashtag, i))}
      </Box>
    </StyledSearchBox>
  );
};

export default SearchBar;
