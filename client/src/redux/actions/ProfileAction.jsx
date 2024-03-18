import axios from "../../../axiosConfig";
import {
  setFollowers,
  setFollowing,
  setProfile,
  ubdateUserFollow,
} from "../slices/ProfileSlice";
import { sessionService } from "redux-react-session";
const getProfile = (Username) => async (dispatch) => {
  try {
    const response = await axios.get(`quest/${Username}`);
    if (response.data) {
      dispatch(setProfile(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = (user, avatar, background) => async (dispatch) => {
  const ubdateAvatar = async () => {
    try {
      console.log("Profil avatars güncelleniyor", avatar, user.username);

      const formData = new FormData();
      const avatarData = await avatar; // Promise'in çözülmesini bekleyin
      formData.append("file", avatarData);

      const response = await axios.post(
        `users/upload/images?username=${user?.username}&folder=avatars`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Profil avatars güncellendi", response.data.filename);
        const newAvatarUrl = `uploads/images/avatars/${response.data.filename}`;
        return newAvatarUrl;
      } else {
        throw new Error("Profil avatars güncellenemedi");
      }
    } catch (error) {
      console.log("Profil avatars güncelleme hatası:", error.message);
    }
  };

  const ubdateBackground = async () => {
    try {
      console.log("Profil arkaplan güncelleniyor", background, user.username);

      const formData = new FormData();
      const backgroundData = await background; // Promise'in çözülmesini bekleyin
      formData.append("file", backgroundData);

      const response = await axios.post(
        `users/upload/images?username=${user?.username}&folder=backgrounds`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Profil arkaplan güncellendi", response.data.filename);
        const newBackgroundUrl = `uploads/images/backgrounds/${response.data.filename}`;
        return newBackgroundUrl;
      } else {
        throw new Error("Profil arkaplan güncellenemedi");
      }
    } catch (error) {
      console.log("Profil arkaplan güncelleme hatası:", error.message);
    }
  };

  const newAvatarUrl = avatar ? await ubdateAvatar() : user?.avatar;
  const newBackgroundUrl = background
    ? await ubdateBackground()
    : user?.background;

  const response = await axios.put(`users/ubdateUser/${user._id}`, {
    ...user,
    avatar: newAvatarUrl,
    background: newBackgroundUrl,
  });
  if (response.status === 200) {
    alert("Profiliniz başarıyla güncellendi");
    const logginedUser = await sessionService.loadUser();
    const updatedUser = {
      ...logginedUser,
      ...user,
      avatar: newAvatarUrl,
      background: newBackgroundUrl,
    };
    await sessionService.saveUser(updatedUser);
    dispatch(setProfile(updatedUser));
  } else {
    alert("Profiliniz güncellenemedi");
  }
};

const getFollowers = (username) => async (dispatch) => {
  try {
    const response = await axios.get(`quest/followers/${username}`, {});

    if (response.data) {
      dispatch(setFollowers(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const getFollowing = (username) => async (dispatch) => {
  try {
    const response = await axios.get(`quest/following/${username}`, {});
    if (response.data) {
      dispatch(setFollowing(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const follow = (followingId) => async (dispatch) => {
  try {
    const logginedUser = await sessionService.loadUser();
    const logginedUserId = logginedUser._id;

    const response = await axios.put(
      `users/follow/${logginedUserId}/${followingId}`
    );

    if (response.status === 200) {
      console.log("Takip işlemi başarılı");
      const updatedUser = {
        ...logginedUser,
        following: [...logginedUser.following, followingId],
      };
      await sessionService.saveUser(updatedUser);

      dispatch(ubdateUserFollow(logginedUserId));
    }
  } catch (error) {
    console.log(error);
  }
};

const unfollow = (followingId) => async (dispatch) => {
  try {
    const logginedUser = await sessionService.loadUser();
    const logginedUserId = logginedUser._id;

    const response = await axios.put(
      `users/unfollow/${logginedUserId}/${followingId}`
    );

    if (response.status === 200) {
      console.log("Takip bırakma işlemi başarılı");

      const updatedUser = {
        ...logginedUser,
        following: logginedUser.following.filter((id) => id !== followingId),
      };
      await sessionService.saveUser(updatedUser);

      dispatch(ubdateUserFollow(logginedUserId));
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  getProfile,
  getFollowers,
  getFollowing,
  follow,
  unfollow,
  updateProfile,
};
