import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IosShareIcon from "@mui/icons-material/IosShare";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import { Avatar, Box } from "@mui/material";
import { red } from "@mui/material/colors";
import Card from "@mui/material/Card";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import "./scss/post.scss";
import { useState } from "react";
import {
  favorite,
  like,
  unFavorite,
  unLike,
} from "../../redux/actions/PostActions";
import { useDispatch } from "react-redux";
const Post = ({ post }) => {
  const navigate = useNavigate();
  const LoginUserId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const ExpandMore = styled(IconButton)(({ expand }) => ({
    color: "white",
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
        subheader={
          <Typography
            onClick={() => navigate(`/${post.username}`)}
            sx={{ fontSize: "0.8rem", color: "gray", cursor: "pointer" }}
          >
            @{post.username}
          </Typography>
        }
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
            {post.likes.some((id) => id === LoginUserId) ? (
              <FavoriteIcon onClick={() => dispatch(unLike(post))} />
            ) : (
              <FavoriteBorderIcon onClick={() => dispatch(like(post))} />
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
              <StarIcon onClick={() => dispatch(unFavorite(post))} />
            ) : (
              <StarBorderIcon onClick={() => dispatch(favorite(post))} />
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
