import PropTypes from "prop-types";
import { IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { like, unLike } from "../../redux/actions/PostActions";
import { useDispatch } from "react-redux";

const LikeActions = ({post}) => {
  const dispatch = useDispatch();

  const handleLike = () => {
       dispatch(post?.isLike
            ? unLike(post)
            : like(post)
        )
  };
  return (
    <IconButton aria-label="like" onClick={handleLike}>
      {post.isLike ? (
        <FavoriteIcon />
      ) : (
        <FavoriteBorderIcon />
      )}
      <Typography
        color="primary"
        sx={{ fontSize: "1.3rem", marginLeft: "5px" }}
      >
        {post?.likesCount}
      </Typography>
    </IconButton>
  );
};

export default LikeActions;
LikeActions.propTypes = {
  post: PropTypes.object.isRequired,
};
