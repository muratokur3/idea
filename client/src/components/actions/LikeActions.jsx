import PropTypes from "prop-types";
import { IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { like, unLike } from "../../redux/actions/PostActions";
import { useDispatch, useSelector } from "react-redux";

const LikeActions = ({ post, logginedUserId }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state) => state.session && state.session.authenticated
  );

  const handleLike = () => {
    isLoggedIn && logginedUserId
      ? dispatch(
          new Set(post?.likes).has(logginedUserId)
            ? unLike(post, logginedUserId)
            : like(post, logginedUserId)
        )
      : alert("Giriş yapmalısınız");
  };
  return (
    <IconButton aria-label="like" onClick={handleLike}>
      {new Set(post?.likes).has(logginedUserId) ? (
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
  logginedUserId: PropTypes.string.isRequired,
};
