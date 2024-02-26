import { Button } from '@mui/material';
import PropTypes from 'prop-types' 
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from 'react-redux';
import { favorite, unFavorite } from '../../redux/actions/PostActions';

const FavoriteActions = ({post,loginUserId}) => {
    const dispatch=useDispatch();
    const handleFavorite = () => {
        loginUserId
          ? dispatch(
              new Set(post?.favorite).has(loginUserId)
                ? unFavorite(post, loginUserId)
                : favorite(post, loginUserId)
            )
          : alert("Giriş yapmalısınız");
      };
  return (
    <Button aria-label="favorites" onClick={handleFavorite}>
    {new Set(post?.favorites).has(loginUserId) ? (
      <StarIcon />
    ) : (
      <StarBorderIcon />
    )}
  </Button>
  )
}

export default FavoriteActions;
FavoriteActions.propTypes={
    post:PropTypes.object,
    loginUserId:PropTypes.string
}