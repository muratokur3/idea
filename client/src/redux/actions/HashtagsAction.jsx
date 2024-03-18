import axios from "../../../axiosConfig";
import { setHashtags, setHashtagsExplore } from "../slices/HashtagSlice";
import { sessionService } from "redux-react-session";

const getHashtags = () => async (dispatch) => {
  try {
    const response = await axios.get(`hashtags`);
    dispatch(setHashtags(response.data));
  } catch (err) {
    console.log(err);
  }
};

const getHashtagsExplore = () => async (dispatch) => {
  try {
    const response = await axios.get(`quest/hashtags/explore`);
    dispatch(setHashtagsExplore(response.data));
  } catch (err) {
    console.log(err);
  }
};

//hashtag takip et
const followHashtag = async ( hashtagname) => {
  try {
    const logginedUser = await sessionService.loadUser();
    const response = await axios.put(
      `users/followHashtag/${logginedUser._id}/${hashtagname}`
    );
    if (response.status === 200) {
      const updatedUser = {
        ...logginedUser,
        hashtags: [...logginedUser.hashtags, hashtagname],
      };
      await sessionService.saveUser(updatedUser);
    }
  } catch (err) {
    console.log(err);
  }
};

//hashtag takip etmeyi bırak
const unfollowHashtag = async ( hashtagname) => {
  try {
    const logginedUser = await sessionService.loadUser();

    const response = await axios.put(
      `users/unfollowHashtag/${logginedUser._id}/${hashtagname}`
    );
    if (response.status === 200) {
      const updatedUser = {
        ...logginedUser,
        hashtags: logginedUser.hashtags.filter((name) => name !== hashtagname),
      };
      await sessionService.saveUser(updatedUser);
    }
  } catch (err) {
    console.log(err);
  }
};
export { getHashtags, getHashtagsExplore, followHashtag, unfollowHashtag };
