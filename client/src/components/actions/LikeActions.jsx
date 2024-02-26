import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { like, unLike } from '../../redux/actions/PostActions';
import { useDispatch } from 'react-redux';

const LikeActions = ({post,loginUserId}) => {
    const dispatch=useDispatch();
    const handleLike = () => {
        loginUserId&&
        loginUserId
          ? dispatch(
              new Set(post?.likes).has(loginUserId)
                ? unLike(post, loginUserId)
                : like(post, loginUserId)
            )
          : alert("Giriş yapmalısınız");
      };
  return (
    <IconButton aria-label="like" onClick={handleLike}>
            {new Set(post?.likes).has(loginUserId) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
            <p style={{ color: "gray", fontSize: "1.2rem" }}>
              {post?.likesCount}
            </p>
          </IconButton>
  )
}

export default LikeActions;
LikeActions.propTypes={
    post:PropTypes.object,
    loginUserId:PropTypes.string
}

