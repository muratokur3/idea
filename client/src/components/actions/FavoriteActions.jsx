import { Button } from '@mui/material';
import PropTypes from 'prop-types' 
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from 'react-redux';
import { favorite, unFavorite } from '../../redux/actions/PostActions';

const FavoriteActions = ({post,logginedUserId}) => {
    const dispatch=useDispatch();
    const isLoggedIn = useSelector(state => state.session && state.session.authenticated);

    const handleFavorite = () => {
      isLoggedIn
          ? dispatch(
              new Set(post?.favorites).has(logginedUserId)
                ? unFavorite(post, logginedUserId)
                : favorite(post, logginedUserId)
            )
          : alert("Giriş yapmalısınız");
      };
  return (
    <Button aria-label="favorites" onClick={handleFavorite}>
    {new Set(post?.favorites).has(logginedUserId) ? (
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
    logginedUserId:PropTypes.string
}