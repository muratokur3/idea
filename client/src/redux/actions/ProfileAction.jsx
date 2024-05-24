import axios from "../../../axiosConfig";
import {
  setFavorites,
  setFollowers,
  setFollowing,
  setProfile,
  setProfilePosts,
  updateUserFollow,
} from "../slices/ProfileSlice";
import { sessionService } from "redux-react-session";

const getProfile = (username) => async (dispatch) => {
  try {
    const response = await axios.get(`quest/profile/${username}`);
    if (response.data) {
      dispatch(setProfile(response.data));
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      window.location.href = "/";
      alert("Kullanıcı bulunamadı");
    }
    console.log(error);
  }
};

const updateBackground = (background, user) => async (dispatch) => {
  try {
    console.log("Profil arkaplan güncelleniyor", background, user.username);

    const formData = new FormData();
    const backgroundData = await background;
    formData.append("file", backgroundData);

    const response = await axios.post(
      `users/upload/images?filename=${user.username}&folder=backgrounds`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      console.log("Profil arkaplan güncellendi", response.data);
      //session içindeki user background içeriği güncelleniyor
      const logginedUser = await sessionService.loadUser();
      const updatedUser = {
        ...logginedUser,
        ...user,
        background: response.data.adress,
      };
      await sessionService.saveUser(updatedUser);

      dispatch(setProfile(updatedUser));
      return response.data.adress;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Profil arkaplan güncelleme hatası:", error.message);
  }
};

const updateAvatar = (avatar, user) => async (dispatch) => {
  try {
    console.log("Profil görseli güncelleniyor", avatar, user.username);

    const formData = new FormData();
    const avatarData = await avatar;
    formData.append("file", avatarData);

    const response = await axios.post(
      `users/upload/images?filename=${user.username}&folder=avatars`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      console.log("Profil görseli güncellendi", response.data);
      //session içindeki user profil görseli içeriği güncelleniyor
      const logginedUser = await sessionService.loadUser();
      const updatedUser = {
        ...logginedUser,
        ...user,
        avatar: response.data.adress,
      };
      await sessionService.saveUser(updatedUser);
      dispatch(setProfile(updatedUser));
      return response.data.adress;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Profil görseli güncelleme hatası:", error.message);
  }
};

// const unInstallImage = (user,folder) => async (dispatch) => {
//   try {
//     const response = await axios.delete(`user/uninstallimage/${folder}`);
//     if (response.status === 200) {
//       const logginedUser = await sessionService.loadUser();
//       const updatedUser = {
//         ...logginedUser,
//         ...user,
//       };
//       await sessionService.saveUser(updatedUser);
//       dispatch(setProfile(updatedUser));
//     } else {
//       console.error('Resim silinirken bir hata oluştu:', response);
//     }
//   } catch (error) {
//     console.error('Resim silinirken bir hata oluştu:', error);
//   }
// }


const updateProfile = (user, modalAction) => async (dispatch) => {
  try {
    const response = await axios.put(`users/updateUser`, {
      ...user,
    });

    if (response.status === 200) {
      alert("Profiliniz başarıyla güncellendi");
      const logginedUser = await sessionService.loadUser();
      const updatedUser = {
        ...logginedUser,
        ...user,
      };
      await sessionService.saveUser(updatedUser);
      dispatch(setProfile(updatedUser));
      modalAction.handleClose();
    } else {
      alert("Profiliniz güncellenemedi");
    }
  } catch (error) {
    window.alert(error?.response?.data);
  }
};

const getFollowers = (pagination, username) => async (dispatch) => {
  try {
    const response = await axios.get(`quest/followers/${username}`, {
      params: {
        page: pagination.page,
      },
    });

    if (response.data) {
      dispatch(
        setFollowers({
          users: response.data.users,
          pagination: response.data.pagination,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const getFollowing = (pagination, username) => async (dispatch) => {
  try {
    const response = await axios.get(`quest/following/${username}`, {
      params: {
        page: pagination.page,
      },
    });
    if (response.data) {
      dispatch(
        setFollowing({
          users: response.data.users,
          pagination: response.data.pagination,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfilePosts = (pagination, username) => async (dispatch) => {
  try {
    const response = await axios.get(`quest/posts/profile/${username}`, {
      params: {
        page: pagination.page,
      },
    });
    dispatch(
      setProfilePosts({
        posts: await response.data.posts,
        pagination: await response.data.pagination,
      })
    );
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getFavorites = (pagination, username) => async (dispatch) => {
  try {
    const response = await axios.get(`quest/posts/favorite/${username}`, {
      params: {
        page: pagination.page,
      },
    });

    dispatch(
      setFavorites({
        posts: await response.data.posts,
        pagination: await response.data.pagination,
      })
    );
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const follow = (followingId) => async (dispatch) => {
  try {
    const response = await axios.put(`users/follow/${followingId}`);
    if (response.status === 200) {
      dispatch(updateUserFollow(followingId));
    }
  } catch (error) {
    console.log(error);
  }
};

const unfollow = (followingId) => async (dispatch) => {
  try {
    const response = await axios.put(`users/unfollow/${followingId}`);
    if (response.status === 200) {
      dispatch(updateUserFollow(followingId));
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  getProfile,
  getFollowers,
  getFollowing,
  getProfilePosts,
  getFavorites,
  follow,
  unfollow,
  updateProfile,
  updateAvatar,
  updateBackground,
};
