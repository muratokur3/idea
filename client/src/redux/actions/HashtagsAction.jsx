import axios from "axios";
import { setHashtags, setHashtagsExplore } from "../slices/HashtagSlice";
import { updateUserHashtag } from "../slices/AuthSlice";
const urlApi = import.meta.env.VITE_API_BASE_URL;

const getHashtags = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/hashtags`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch(setHashtags(response.data));
  } catch (err) {
    console.log(err);
  }
};

const getHashtagsExplore = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/quest/hashtags/explore`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch(setHashtagsExplore(response.data));
  } catch (err) {
    console.log(err);
  }
};

//hashtag takip et
const followHashtag = (userId, hashtagname) => async (dispatch) => {
  try {
    const userResposne = await axios.get(`${urlApi}/api/users/id/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const user =await userResposne.data;
    
    console.log(user,hashtagname)
    const response = await axios.put(
      `${urlApi}/api/users/followHashtag/${userId}/${hashtagname}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
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
    const userResponse = await axios.get(`${urlApi}/api/users/id/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const user = await userResponse.data;
    
    console.log(user,hashtagname)
    const response = await axios.put(
      `${urlApi}/api/users/unfollowHashtag/${userId}/${hashtagname}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      dispatch(updateUserHashtag(hashtagname));
    }
  } catch (err) {
    console.log(err);
  }
};
export { getHashtags, getHashtagsExplore, followHashtag, unfollowHashtag };
