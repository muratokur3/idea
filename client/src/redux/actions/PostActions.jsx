import axios from "axios";
import {
  setHome,
  setPrivateMe,
  setExplore,
  setFavorites,
  setProfilePosts,
  setProfileLikes,
  setHashtagExplore,
  setLikeData,
} from "../slices/PostSlice";

const urlApi = import.meta.env.VITE_API_BASE_URL;
const userId = localStorage.getItem("userId");

const getHomeData = (pagination) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts/timeline/${userId}`, {
      params: {
        page: pagination.page,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(
      setHome({
        posts: await response.data.posts,
        pagination: await response.data.pagination,
      })
    );
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getPrivateMeData = (pagination) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${urlApi}/api/posts/privateMe/${userId}`,
      {
        params: {
          page: pagination.page,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(
      setPrivateMe({
        posts: await response.data.posts,
        pagination: await response.data.pagination,
      })
    );
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getExploreData = (pagination) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts/explore`, {
      params: {
        page: pagination.page,
      },
      headers: { "Content-Type": "application/json" },
    });
    dispatch(
      setExplore({
        posts: await response.data.posts,
        pagination: await response.data.pagination,
      })
    );
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getHashtagExploreData = (pagination, hashtag) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts/explore/hashtag`, {
      params: {
        hashtagname: hashtag,
        page: pagination.page,
      },
      headers: { "Content-Type": "application/json" },
    });
    dispatch(
      setHashtagExplore({
        posts: await response.data.posts,
        pagination: await response.data.pagination,
      })
    );
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getFavoritesPosts = (pagination, username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${urlApi}/api/posts/favorite/${username}`,
      {
        params: {
          page: pagination.page,
        },
        headers: { "Content-Type": "application/json" },
      }
    );
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

const getProfilePosts = (pagination, username) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${urlApi}/api/posts/profile/${username}`,
      {
        params: {
          page: pagination.page,
        },
        headers: { "Content-Type": "application/json" },
      }
    );
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

const getProfileLikesPosts = (pagination, username) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlApi}/api/posts/likes/${username}`, {
      params: {
        page: pagination.page,
      },
      headers: { "Content-Type": "application/json" },
    });
    dispatch(
      setProfileLikes({
        posts: await response.data.posts,
        pagination: await response.data.pagination,
      })
    );
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const createPost = (post) => async () => {
  try {
    await axios.post(`${urlApi}/api/posts`, post, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("veri kaydederken hata oluştu:", error);
  }
};

const like = (post) => async (dispatch) => {
  try {

    // Sunucuya beğeni isteği gönder
    const response = await axios.post(
      `${urlApi}/api/posts/like/${post._id}/${userId}`
    );

    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setLikeData({ post, userId: userId }));
      // Başarılı beğeni işlemi
      console.log("Post beğenildi");
    }
  } catch (error) {
    // Beklenmeyen hataları ele al
      console.log(error.message);
  }
};

const unLike = (post) => async (dispatch) => {
  try {
    // Kullanıcıya beğeni geri alma işlemi gerçekleştiriliyor olarak göster

    // Sunucuya beğeni geri alma isteği gönder
    const response = await axios.post(
      `${urlApi}/api/posts/unlike/${post._id}/${userId}`
    );

    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setLikeData({ post, userId: userId }));
      console.log("Post beğenildi");
    }
  } catch (error) {
    // Beklenmeyen hataları ele al
      console.log(error.message);
  }
};

export {
  getHomeData,
  getPrivateMeData,
  getExploreData,
  getHashtagExploreData,
  getFavoritesPosts,
  getProfilePosts,
  getProfileLikesPosts,
  like,
  unLike,
  createPost,
};
