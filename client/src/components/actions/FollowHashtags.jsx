import { useDispatch, useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { Button } from "@mui/material";
import {
  followHashtag,
  unfollowHashtag,
} from "../../redux/actions/HashtagsAction";

const FollowHashtags = ({ hashtagName }) => {
    const dispatch = useDispatch();
    const activeUser = useSelector((state) => state.session && state.session.user);
    const activeUserHashtags = useSelector((state) => state.session && state.session.hashtags);

    const handleFollowHashtag = () => {
        dispatch(
            new Set(activeUserHashtags).has(hashtagName)
                ? unfollowHashtag(activeUser?._id, hashtagName)
                : followHashtag(activeUser?._id, hashtagName)
        );
    };

    return (
        <Button aria-label="follow hashtag" onClick={handleFollowHashtag}>
            {new Set(activeUserHashtags).has(hashtagName)
                ? "takibi bırak"
                : "takip et"}
        </Button>
    );
};

export default FollowHashtags;
FollowHashtags.propTypes = {
  hashtagName: PropTypes.string.isRequired,
};
