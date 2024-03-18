import { useDispatch, useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { Button } from "@mui/material";
import {
  followHashtag,
  unfollowHashtag,
} from "../../redux/actions/HashtagsAction";

const FollowHashtags = ({ hashtagName }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.session && state.session.authenticated);
  const logginedUser = useSelector(
    (state) => state.session && state.session.user
  );
  const logginedUserHashtags = logginedUser?.hashtags || [];

  const handleFollowHashtag = () => {
    dispatch(
      new Set(logginedUserHashtags).has(hashtagName)
        ? unfollowHashtag(hashtagName)
        : followHashtag(hashtagName)
    );
  };

  return (
    isLoggedIn && (
      <Button aria-label="follow hashtag" onClick={handleFollowHashtag}>
        {new Set(logginedUserHashtags).has(hashtagName)
          ? "takibi bırak"
          : "takip et"}
      </Button>
    )
  );
};

export default FollowHashtags;
FollowHashtags.propTypes = {
  hashtagName: PropTypes.string.isRequired,
};
