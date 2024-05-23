import axios from "../../../axiosConfig";
import {
  setHome,
  setPrivateMe,
  setExplore,
  setMyFavorites,
  setMyLikes,
  setHashtagExplore,
  setUbdateData,
  deleteSinglePost,
  createSinglePost,
} from "../slices/PostSlice";

import {
  deleteProfilePost,
  setUpdateProfilePosts,
} from "../slices/ProfileSlice";

const getHomeData = (pagination) => async (dispatch) => {
  try {
    const response = await axios.get(`posts/timeline`, {
      params: {
        page: pagination.page,
      },
    });
    console.log(response.data);
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

const getHomeQuestData = (pagination) => async (dispatch) => {
  try {
    const response = await axios.get(`quest/posts/timeline`, {
      params: {
        page: pagination.page,
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
    const response = await axios.get(`posts/privateMe`, {
      params: {
        page: pagination.page,
      },
    });
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
    const response = await axios.get(`quest/posts/explore`, {
      params: {
        page: pagination.page,
      },
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
    const response = await axios.get(`quest/posts/explore/hashtag`, {
      params: {
        hashtagname: hashtag,
        page: pagination.page,
      },
    });
    dispatch(
      setHashtagExplore({
        posts: await response.data.posts,
        pagination: await response.data.pagination,
      })
    );
  } catch (error) {
    //status code 404 ise hata mesajı döndür
    if (error.response.status === 404) {
      window.location.href = "/explore";
      alert("Bu isimde bir hashtag bulunamadı.");
    }
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getFavoritesPosts = (pagination) => async (dispatch) => {
  try {
    const response = await axios.get(`posts/favorite`, {
      params: {
        page: pagination.page,
      },
    });
    dispatch(
      setMyFavorites({
        posts: await response.data.posts,
        pagination: await response.data.pagination,
      })
    );
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const getProfileLikesPosts = (pagination) => async (dispatch) => {
  try {
    const response = await axios.get(`posts/likes`, {
      params: {
        page: pagination.page,
      },
    });
    dispatch(
      setMyLikes({
        posts: await response.data.posts,
        pagination: await response.data.pagination,
      })
    );
  } catch (error) {
    console.error("Veri gelirken hata oluştu:", error);
  }
};

const createOrUpdatePost = (type, postData) => async (dispatch) => {
  try {
    console.log(postData);
    if (type === "new") {
      const response = await axios.post(`posts/new`, postData);
      if (response.status === 201) {
        console.log(response.data[0]);
        dispatch(createSinglePost(response.data[0]));
        // dispatch(createProfilePost(response.data[0]));
      }
    } else if (type === "update") {
      const response = await axios.put(
        `posts/ubdate/${postData._id}`,
        postData
      );
      if (response.status === 201) {
        console.log(response.data);
        setUbdateData(response.data[0]);
        // setUpdateProfilePosts(response.data[0])
      }
    } else console.log("type hatası");
  } catch (error) {
    console.error("veri kaydederken hata oluştu:", error);
  }
};

//silme işlemi
const deletePost = (postId) => async (dispatch) => {
  try {
    const response = await axios.delete(`posts/delete/${postId}`);
    if (response.status === 200) {
      dispatch(deleteSinglePost(postId));
      dispatch(deleteProfilePost(postId));
    }
  } catch (error) {
    console.error("veri silerken hata oluştu:", error);
  }
};

const like = (post) => async (dispatch) => {
  try {
    // Sunucuya beğeni isteği gönder
    const response = await axios.post(`posts/like/${post._id}`);
    const newPost = await {
      ...post,
      isLike: true,
      likesCount: post.likesCount + 1,
    };

    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setUbdateData(newPost));
      dispatch(setUpdateProfilePosts(newPost));
    }
  } catch (error) {
    console.log(error.message);
  }
};

const unLike = (post) => async (dispatch) => {
  try {
    // Sunucuya beğeni geri alma isteği gönder
    const response = await axios.post(`posts/unlike/${post._id}`);
    const newPost = await {
      ...post,
      isLike: false,
      likesCount: post.likesCount - 1,
    };
    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setUbdateData(newPost));
      dispatch(setUpdateProfilePosts(newPost));
    }
  } catch (error) {
    console.log(error.message);
  }
};

const favorite = (post) => async (dispatch) => {
  try {
    const response = await axios.post(`posts/favorites/${post._id}`);
    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      const newPost = await {
        ...post,
        isFavorite: true,
      };
      dispatch(setUbdateData(newPost));
      dispatch(setUpdateProfilePosts(newPost));
      // Başarılı beğeni işlemi
    }
  } catch (error) {
    console.log(error.message);
  }
};

const unFavorite = (post) => async (dispatch) => {
  try {
    const response = await axios.post(`posts/unfavorites/${post._id}`);

    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      const newPost = await {
        ...post,
        isFavorite: false,
      };
      dispatch(setUbdateData(newPost));
      dispatch(setUpdateProfilePosts(newPost));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export {
  getHomeData,
  getHomeQuestData,
  getPrivateMeData,
  getExploreData,
  getHashtagExploreData,
  getFavoritesPosts,
  favorite,
  unFavorite,
  getProfileLikesPosts,
  like,
  unLike,
  createOrUpdatePost,
  deletePost,
};
