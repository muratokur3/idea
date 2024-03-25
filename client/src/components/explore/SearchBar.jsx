import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useMediaQuery } from "@mui/material";
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
const StyledSearchBox = styled(Paper)({
  background: "none",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "6rem",
  position:"relative",
  borderBottom: "1px solid #75707068",
});

const SearchBar = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1234px)");

  const [searchText, setSearchText] = useState("");
  const [resultBox, setResultBox] = useState(true);
  const searchData = useSelector((state) => state.search.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginedUser = useSelector(
    (state) => state.session && state.session.user
  );

  const handleSearch = () => {
    searchText.length > 1 &&
      dispatch(
        getSearchResults({
          text: searchText[0] === "#" ? searchText.slice(1) : searchText,
          searchFilter: searchText[0] === "#" ? "hashtags" : "users",
        })
      );
    setResultBox(true);
  };
  useEffect(() => {
    dispatch(setSearch([]));
  }, []);

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
          background: `${theme.palette.postBackground.default}`,
          marginTop: "5px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/${user?.username}`)}
      >
        <CardHeader
          avatar={
            <Avatar
              src={user?.avatar}
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
          title={`${user?.name} ${user?.surname}`}
          titleTypographyProps={{ fontSize: "1rem", color: "primary" }}
          subheader={
            <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
              @{user?.username}
            </Typography>
          }
        />
      </Card>
    );
  };

  return (
    <StyledSearchBox >
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
          top:"100%",
          left: "0",
          width:"100%",
          height: "auto",
          background: `${theme.palette.background.default}`,
          border: "1px solid gray",
          borderTop:"none",
          borderTopRightRadius:"0",
          borderTopLeftRadius:"0",
          borderRadius: "5px",
          color: "white",
          zIndex: "3",
        }}
      >
        {searchData?.users?.map((user, i) => resultItemUsers(user, i))}

        {searchData?.hashtags?.map((hashtag, i) => resultItemHashtags(hashtag, i))}
      </Box>
    </StyledSearchBox>
  );
};

export default SearchBar;
