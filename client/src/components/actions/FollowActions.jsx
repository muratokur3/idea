import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { follow, unfollow } from "../../redux/actions/ProfileAction";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
const FollowActions = ({ user }) => {
  const isLoggedIn = useSelector(
    (state) => state.session && state.session.authenticated
  );
  const logginedUser = useSelector(
    (state) => state.session && state.session.user
  );
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleFollow = () => {
    user.isFollow ? dispatch(unfollow(user._id)) : dispatch(follow(user._id));
  };
  return (
    isLoggedIn &&
    logginedUser._id !== user._id && (
      <Button
        aria-label="follow"
        variant="contained"
        size="large"
        sx={{
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.background.default,
          borderRadius:"1rem"
        }}
        onClick={handleFollow}
      >
        {user.isFollow ? "Takibi Bırak" : "Takip Et"}
      </Button>
    )
  );
};

export default FollowActions;
FollowActions.propTypes = {
  user: PropTypes.object.isRequired,
};
