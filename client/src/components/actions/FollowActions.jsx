import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { follow, unfollow } from "../../redux/actions/ProfileAction";
import { useDispatch } from "react-redux";

const FollowActions = ({user,activeUser}) => {
  const dispatch = useDispatch();
  const handleFollow = () => {
      new Set(user?.followers).has(activeUser?._id)
        ? dispatch(unfollow(activeUser?._id, user?._id, user))
        : dispatch(follow(activeUser?._id, user?._id, user));
  }
  return (
    <Button aria-label="follow" variant="contained" color="primary"
    onClick={handleFollow}>
      { new Set(user?.followers).has(activeUser?._id)? "Takibi Bırak" : "Takip Et"}
    </Button>
)
}

export default FollowActions
FollowActions.propTypes = {
  user: PropTypes.object.isRequired,
  activeUser: PropTypes.object.isRequired,
};