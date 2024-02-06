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
const username = localStorage.getItem("username");
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

const getFavoritesPosts = (pagination) => async (dispatch) => {
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
    const newPost = {
      ...post,
      likes: new Set(post.likes).has(userId)
        ? post.likes
        : [...post.likes, userId],
      likesCount:
        new Set(post.likes).has(userId) === false && post.likesCount + 1,
    };

    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setLikeData({ newPost }));
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
    const newPost = {
      ...post,
      likes:
        new Set(post.likes).has(userId) &&
        post.likes.filter((id) => id !== userId),
      likesCount:
        new Set(post.likes).has(userId) === true && post.likesCount - 1,
    };
    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setLikeData({ newPost }));
      console.log("Post beğenisi geri alındı");
    }
  } catch (error) {
    // Beklenmeyen hataları ele al
    console.log(error.message);
  }
};

const favorite = (post) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${urlApi}/api/posts/favorites/${post._id}/${userId}`
    );
    const newPost = {
      ...post,
      favorites: new Set(post.favorites).has(userId)
        ? post.favorites
        : [...post.favorites, userId],
    };

    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setLikeData({ newPost }));
      // Başarılı beğeni işlemi
      console.log("favoriye eklendi");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const unFavorite = (post) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${urlApi}/api/posts/unfavorites/${post._id}/${userId}`
    );
    const newPost = {
      ...post,
      favorites:
        new Set(post.favorites).has(userId)
        ?post.favorites.filter((id) => id !== userId)
        : post.favorites,
    };

    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setLikeData({ newPost }));
      // Başarılı beğeni işlemi
      console.log("favoriden çıkarıldı");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export {
  getHomeData,
  getPrivateMeData,
  getExploreData,
  getHashtagExploreData,
  getFavoritesPosts,
  favorite,
  unFavorite,
  getProfilePosts,
  getProfileLikesPosts,
  like,
  unLike,
  createPost,
};
