import { Button } from "@mui/material";
import PropTypes from "prop-types";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { favorite, unFavorite } from "../../redux/actions/PostActions";

const FavoriteActions = ({ post }) => {
  const dispatch = useDispatch();

  const handleFavorite = () => {
    dispatch(post.isFavorite ? unFavorite(post) : favorite(post));
  };
  return (
    <Button aria-label="favorites" onClick={handleFavorite}>
      {post.isFavorite ? <StarIcon /> : <StarBorderIcon />}
    </Button>
  );
};

export default FavoriteActions;
FavoriteActions.propTypes = {
  post: PropTypes.object,
};
