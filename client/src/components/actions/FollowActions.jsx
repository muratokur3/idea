import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { follow, unfollow } from "../../redux/actions/ProfileAction";
import { useDispatch, useSelector } from "react-redux";

const FollowActions = ({ toFollowUserId }) => {
  const isLoggedIn = useSelector(state => state.session && state.session.authenticated);
  const logginedUser = useSelector(
    (state) => state.session && state.session.user
  );

  const dispatch = useDispatch();

  const handleFollow = () => {
    new Set(logginedUser.following).has(toFollowUserId)
      ? dispatch(unfollow(toFollowUserId))
      : dispatch(follow(toFollowUserId));
  };
  return (
    isLoggedIn&& logginedUser._id !== toFollowUserId && (
      <Button
        aria-label="follow"
        variant="contained"
        color="primary"
        size="small"
        onClick={handleFollow}
      >
        {new Set(logginedUser.following).has(toFollowUserId)
          ? "Takibi Bırak"
          : "Takip Et"}
      </Button>
    )
  );
};

export default FollowActions;
FollowActions.propTypes = {
  toFollowUserId: PropTypes.string.isRequired,
};
