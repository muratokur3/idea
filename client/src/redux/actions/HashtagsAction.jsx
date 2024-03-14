import axios from '../../../axiosConfig';
import { setHashtags, setHashtagsExplore } from "../slices/HashtagSlice";
import { updateUserHashtag } from "../slices/AuthSlice";
const urlApi = import.meta.env.VITE_API_BASE_URL;

const getHashtags = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/hashtags`);
    dispatch(setHashtags(response.data));
  } catch (err) {
    console.log(err);
  }
};

const getHashtagsExplore = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/quest/hashtags/explore`);
    dispatch(setHashtagsExplore(response.data));
  } catch (err) {
    console.log(err);
  }
};

//hashtag takip et
const followHashtag = (userId, hashtagname) => async (dispatch) => {
  try {
    const userResposne = await axios.get(`${urlApi}/api/users/id/${userId}`);
    const user = await userResposne.data;

    console.log(user, hashtagname);
    const response = await axios.put(
      `${urlApi}/api/users/followHashtag/${userId}/${hashtagname}`
    );
    if (response.status === 200) {
      dispatch(updateUserHashtag(hashtagname));
    }
  } catch (err) {
    console.log(err);
  }
};

//hashtag takip etmeyi bırak
const unfollowHashtag = (userId, hashtagname) => async (dispatch) => {
  try {
    const userResponse = await axios.get(`${urlApi}/api/users/id/${userId}`);
    const user = await userResponse.data;

    console.log(user, hashtagname);
    const response = await axios.put(
      `${urlApi}/api/users/unfollowHashtag/${userId}/${hashtagname}`
    );
    if (response.status === 200) {
      dispatch(updateUserHashtag(hashtagname));
    }
  } catch (err) {
    console.log(err);
  }
};
export { getHashtags, getHashtagsExplore, followHashtag, unfollowHashtag };
