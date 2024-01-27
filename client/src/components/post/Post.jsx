import "./scss/post.scss";
import PropTypes from "prop-types";
import { Avatar, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Collapse from "@mui/material/Collapse";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Post = ({ post }) => {
  const navigate = useNavigate();
  const LoginUserId = localStorage.getItem("userId");
  const ExpandMore = styled(IconButton)(({ expand }) => ({
    // buraya stilleriniz gelecek
  }));

  ({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  });
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const urlApi = import.meta.env.VITE_API_BASE_URL;

  const like = async (postId, userId) => {
    try {
      await axios.post(`${urlApi}/api/posts/like/${postId}/${userId}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  const unLike = async (postId, userId) => {
    try {
      await axios.post(`${urlApi}/api/posts/unlike/${postId}/${userId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const favorite = async (postId, userId) => {
    try {
      await axios.post(`${urlApi}/api/posts/favorites/${postId}/${userId}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  const unFavorite = async (postId, userId) => {
    try {
      await axios.post(`${urlApi}/api/posts/unfavorites/${postId}/${userId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "100%",
        backgroundColor: "rgba(13, 13, 13, 0.63)",
        marginTop: "10px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={post.avatar}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.name + " " + post.surname}
        subheader={<Typography onClick={()=>navigate(`/${post.username}`)}
        sx={{ fontSize: "0.8rem", color: "gray",cursor:"pointer" }}>
          @{post.username}
        </Typography>}
        subheaderTypographyProps={{ color: "gray" }}
      />

      <CardContent>
        <Typography variant="body2" color="white" padding="10px">
          {post.title}
        </Typography>
        {post.hashtagsName.map((hashtag) => (
          <Typography
            key={hashtag}
            variant="body3"
            sx={{
              fontSize: ".8rem",
              display: "inline-block",
              marginRight: "10px",
              color: "black",
              backgroundColor: "gray",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            {hashtag}
          </Typography>
        ))}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton aria-label="like">
            {post.likes.find((userId) => userId === LoginUserId) ? (
              <FavoriteIcon onClick={() => unLike(post._id, LoginUserId)} />
            ) : (
              <FavoriteBorderIcon onClick={() => like(post._id, LoginUserId)} />
            )}
            <p style={{ color: "gray", fontSize: "1.2rem" }}>
              {post.likesCount}
            </p>
          </IconButton>
          <IconButton aria-label="share">
            <IosShareIcon />
          </IconButton>
          <IconButton aria-label="favorites">
            {post.favorites.find((userId) => userId === LoginUserId) ? (
              <StarIcon onClick={() => unFavorite(post._id, LoginUserId)} />
            ) : (
              <StarBorderIcon onClick={() => favorite(post._id, LoginUserId)} />
            )}
          </IconButton>
        </Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ backgroundColor: "gray" }}>
          <Typography paragraph>{post.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;

Post.propTypes = {
  post: PropTypes.object,
};
