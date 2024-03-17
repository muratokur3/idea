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

const updateProfile =  (user, avatar,background) =>async (dispatch) => {
  const ubdateAvatar = async () => {
    try {
      console.log("Profil avatars güncelleniyor", avatar, user.username);
  
      const formData = new FormData();
      const avatarData = await avatar; // Promise'in çözülmesini bekleyin
      formData.append("file", avatarData);
  
      const response = await axios.post(
        `${apiUrl}/api/users/upload/images?username=${user?.username}&folder=avatars`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Profil avatars güncellendi", response.data.filename);
        const newAvatarUrl = `${apiUrl}/uploads/images/avatars/${response.data.filename}`;
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
        `${apiUrl}/api/users/upload/images?username=${user?.username}&folder=backgrounds`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Profil arkaplan güncellendi", response.data.filename);
        const newBackgroundUrl = `${apiUrl}/uploads/images/backgrounds/${response.data.filename}`;
       return newBackgroundUrl;
      } else {
        throw new Error("Profil arkaplan güncellenemedi");
      }
    } catch (error) {
      console.log("Profil arkaplan güncelleme hatası:", error.message);
    }
  }

  const newAvatarUrl = avatar ? await ubdateAvatar() : user?.avatar;
  const newBackgroundUrl = background ? await ubdateBackground() : user?.background;

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
