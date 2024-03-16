import axios from '../../../axiosConfig';
import {
  setFollowers,
  setFollowing,
  setProfile,
  ubdateUserFollow,
} from "../slices/ProfileSlice";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const getProfile = (Username) => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/api/quest/${Username}`);
    if (response.data) {
      dispatch(setProfile(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = (user, avatar, background) => async (dispatch) => {
  const ubdateAvatar = async () => {
    console.log("Profil resmi güncelleniyor", avatar, user.username);
    try {
      const avatarfile = new FormData();
      avatarfile.append("file", await avatar);
      const response = await axios.post(
        `${apiUrl}/api/users/upload/avatars?username=${user?.username}`,
        avatarfile
      );
      if (response.status === 200) {
        console.log("Profil resmi güncellendi", response.data.filename);
        return `${apiUrl}/uploads/images/avatars/${response.data.filename}`;
      }
    } catch (error) {
      console.log("avatar olmadı", error, error.message);
    }
  };

  const ubdateBackground = async () => {
    console.log("background güncelleniyor", background, user.username);

    try {
      const data = new FormData();
      data.append("file", await background);
      const responseBackground = await axios.post(
        `${apiUrl}/api/users/upload/backgrounds?username=${user?.username}`,
        data
      );
      if (responseBackground.status === 200) {
        console.log(
          "Arkaplan resmi güncellendi",
          responseBackground.data.filename
        );
        return `${apiUrl}/uploads/images/backgrounds/${responseBackground.data.filename}`;
      }

      console.log("Arkaplan resmi güncellenemedi", responseBackground);
    } catch (error) {
      console.log("Arkaplan resmi güncellenemedi", error.message);
    }
  };

  const newAvatarUrl = avatar ? await ubdateAvatar() : user?.avatar;
  const newBackgroundUrl = background
    ? await ubdateBackground()
    : user?.background;

  const response = await axios.put(
    `${apiUrl}/api/users/ubdateUser/${user._id}`,
    {
      ...user,
      avatar: newAvatarUrl,
      background: newBackgroundUrl,
    }
  );
  if (response.status === 200) {
    alert("Profiliniz başarıyla güncellendi");

    dispatch(
      setProfile({
        ...user,
        avatar: newAvatarUrl ? newAvatarUrl : user.avatar,
        background: newBackgroundUrl ? newBackgroundUrl : user.background,
      })
    );
  } else {
    alert("Profiliniz güncellenemedi");
  }
};

const getFollowers = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/quest/followers/${username}`,
      {}
    );

    if (response.data) {
      dispatch(setFollowers(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const getFollowing = (username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/quest/following/${username}`,
      {}
    );
    if (response.data) {
      dispatch(setFollowing(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const follow = (followerId, followingId, user) => async (dispatch) => {
  if (!user) {
    user = await axios.get(`${apiUrl}/api/users/id/${followingId}`);
  }
  try {
    const response = await axios.put(
      `${apiUrl}/api/users/follow/${followerId}/${followingId}`);

    if (response.status === 200) {
      console.log("Takip işlemi başarılı");

      const newUser = {
        ...user,
        followers: new Set(user.followers).has(followerId)
          ? user.followers
          : [...user.followers, followerId],
      };
      dispatch(ubdateUserFollow(newUser));
    }
  } catch (error) {
    console.log(error);
  }
};

const unfollow = (followerId, followingId, user) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${apiUrl}/api/users/unfollow/${followerId}/${followingId}`,
      {}
    );

    if (response.status === 200) {
      console.log("Takip bırakma işlemi başarılı");
      const newUser = {
        ...user,
        followers: new Set(user.followers).has(followerId)
          ? user.followers.filter((id) => id !== followerId)
          : user.followers,
      };
      dispatch(ubdateUserFollow(newUser));
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
