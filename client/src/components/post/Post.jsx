import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IosShareIcon from "@mui/icons-material/IosShare";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import { Link, useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import { Avatar, Box, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useState } from "react";
import "./scss/post.scss";
import {
  favorite,
  like,
  unFavorite,
  unLike,
} from "../../redux/actions/PostActions";
import ActionsButton from "../../Modals/ActionsButton";
import { follow } from "../../redux/actions/ProfileAction";
const Post = ({ post, activeUser }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const LoginUserId = activeUser?._id;
 

  return (
    <Card
      sx={{
        maxWidth: "100%",
        backgroundColor: "rgba(13, 13, 13, 0.63)",
        borderBottom: "1px solid rgba(71, 67, 67, 0.897);",
        padding: "1%",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={post?.avatar}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        action={
          <Box display={"flex"}>
            {activeUser &&
              post?.userId !== LoginUserId &&
              (new Set(activeUser?.following).has(post?.userId) ? (
                <Typography sx={{ color: "white", fontSize: "10px" }}>
                  Takibi Edilen
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() =>
                    dispatch(follow(post?.userId, LoginUserId, activeUser))
                  }
                >
                  Takip Et
                </Button>
              ))}
            <ActionsButton
              actions={[
                {
                  label: "Bildir",
                  onClick: () => {
                    alert("bildir");
                  },
                },
                post?.userId === LoginUserId && {
                  label: "Sil",
                  onClick: () => {
                    alert("sil");
                  },
                },
              ]}
            />
          </Box>
        }
        title={post?.name + " " + post?.surname}
        subheader={
          <Typography
            onClick={() => navigate(`/${post?.username}`)}
            sx={{ fontSize: "0.8rem", color: "gray", cursor: "pointer" }}
          >
            @{post?.username}
          </Typography>
        }
        subheaderTypographyProps={{ color: "gray" }}
      />

      <CardContent>
        <Typography variant="body2" color="white" padding="10px">
          {post?.title}
        </Typography>
        {post?.hashtagsName?.map((hashtag) => (
          <Link
            key={hashtag}
            variant="body3"
            style={{
              textDecoration: "none",
              fontSize: ".8rem",
              display: "inline-block",
              marginRight: "10px",
              color: "black",
              backgroundColor: "gray",
              borderRadius: "10px",
              padding: "5px",
              cursor: "pointer",
            }}
            to={`/explore/${hashtag}`}
          >
            {hashtag}
          </Link>
        ))}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton
            aria-label="like"
            onClick={() =>
              dispatch(
                post?.likes?.some((id) => id === LoginUserId)
                  ? unLike(post, LoginUserId)
                  : like(post, LoginUserId)
              )
            }
          >
            {post?.likes?.some((id) => id === LoginUserId) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
            <p style={{ color: "gray", fontSize: "1.2rem" }}>
              {post?.likesCount}
            </p>
          </IconButton>
          <IconButton aria-label="share">
            <IosShareIcon />
          </IconButton>
          <IconButton
            aria-label="favorites"
            onClick={() =>
              post?.favorites?.find((userId) => userId === LoginUserId)
                ? dispatch(unFavorite(post, LoginUserId))
                : dispatch(favorite(post, LoginUserId))
            }
          >
            {post?.favorites?.find((userId) => userId === LoginUserId) ? (
              <StarIcon />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        </Box>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
          <Typography fontSize={12} color="white" padding="10px">
            detaylar
          </Typography>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ backgroundColor: "gray" }}>
          <Typography paragraph>{post?.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;

Post.propTypes = {
  post: PropTypes.object,
  activeUser: PropTypes.object,
};
