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
import { useSelector } from "react-redux";
const urlApi = import.meta.env.VITE_API_BASE_URL;

const getHomeData = (pagination) => async (dispatch) => {
  if(localStorage.getItem("isLogin") !== "ture"){
    const response = await axios.get(`${urlApi}/api/quest/posts/timeline`, {
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
  }
  const user =await useSelector((state) => state.authentication.user);
  try {
    const response = await axios.get(`${urlApi}/api/posts/timeline/${user._id}`, {
      params: {
        page: pagination.page,
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      
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
  const user =await useSelector((state) => state.authentication.user);

  try {
    const response = await axios.get(
      `${urlApi}/api/posts/privateMe/${user._id}`,
      {
        params: {
          page: pagination.page,
        },
        headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
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
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
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
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
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

const getFavoritesPosts = (pagination,username) => async (dispatch) => {

  try {
    const response = await axios.get(
      `${urlApi}/api/posts/favorite/${username}`,
      {
        params: {
          page: pagination.page,
        },
        headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
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
        headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
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
      withCredentials: true,
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
      withCredentials: true,
    });
  } catch (error) {
    console.error("veri kaydederken hata oluştu:", error);
  }
};

const like = (post) => async (dispatch) => {
  const user =await useSelector((state) => state.authentication.user);
  try {
    // Sunucuya beğeni isteği gönder
    const response = await axios.post(
      `${urlApi}/api/posts/like/${post._id}/${user._id}`,
      {
        withCredentials: true,
      }
    );
    const newPost = {
      ...post,
      likes: new Set(post.likes).has(user._id)
        ? post.likes
        : [...post.likes, user._id],
      likesCount:
        new Set(post.likes).has(user._id) === false && post.likesCount + 1,
    };

    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setLikeData(newPost));
      // Başarılı beğeni işlemi
      console.log("Post beğenildi");
    }
  } catch (error) {
    // Beklenmeyen hataları ele al
    console.log(error.message);
  }
};

const unLike = (post) => async (dispatch) => {
  const user =await useSelector((state) => state.authentication.user);
  try {
    // Kullanıcıya beğeni geri alma işlemi gerçekleştiriliyor olarak göster

    // Sunucuya beğeni geri alma isteği gönder
    const response = await axios.post(
      `${urlApi}/api/posts/unlike/${post._id}/${user._id}`,
      {
      withCredentials: true,

      }
    );
    const newPost = {
      ...post,
      likes:
        new Set(post.likes).has(user._id) &&
        post.likes.filter((id) => id !== user._id),
      likesCount:
        new Set(post.likes).has(user._id) === true && post.likesCount - 1,
    };
    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setLikeData(newPost));
      console.log("Post beğenisi geri alındı");
    }
  } catch (error) {
    // Beklenmeyen hataları ele al
    console.log(error.message);
  }
};

const favorite = (post) => async (dispatch) => {
  const user =await useSelector((state) => state.authentication.user);
  try {
    const response = await axios.post(
      `${urlApi}/api/posts/favorites/${post._id}/${user._id}`,
      {
        withCredentials: true,
      }
    );
    const newPost = {
      ...post,
      favorites: new Set(post.favorites).has(user._id)
        ? post.favorites
        : [...post.favorites, user._id],
    };

    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setLikeData(newPost));
      // Başarılı beğeni işlemi
      console.log("favoriye eklendi");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const unFavorite = (post) => async (dispatch) => {
  const user =await useSelector((state) => state.authentication.user);

  try {
    const response = await axios.post(
      `${urlApi}/api/posts/unfavorites/${post._id}/${user._id}`,
      {
        withCredentials: true,
      }
    );
    const newPost = {
      ...post,
      favorites: new Set(post.favorites).has(user._id)
        ? post.favorites.filter((id) => id !== user._id)
        : post.favorites,
    };

    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setLikeData(newPost));
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
