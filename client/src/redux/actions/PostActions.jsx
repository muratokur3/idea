
import axios from '../../../axiosConfig';
import {
  setHome,
  setPrivateMe,
  setExplore,
  setFavorites,
  setProfilePosts,
  setProfileLikes,
  setHashtagExplore,
  setUbdateData,
} from "../slices/PostSlice";



const getHomeData = (pagination, loginedUserId) => async (dispatch) => {
    try {
      const response = await axios.get(
        `posts/timeline/${loginedUserId}`,
        {
          params: {
            page: pagination.page,
          }
        }
      );
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

const getPrivateMeData = (pagination, loginedUserId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `posts/privateMe/${loginedUserId}`,
      {
        params: {
          page: pagination.page,
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
    const response = await axios.get(`quest/posts/explore`, {
      params: {
        page: pagination.page,
      }
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
    const response = await axios.get(
      `quest/posts/explore/hashtag`,
      {
        params: {
          hashtagname: hashtag,
          page: pagination.page,
        },
       
      }
    );
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
      `posts/favorite/${username}`,
      {
        params: {
          page: pagination.page,
        },
       
        
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
      `quest/posts/profile/${username}`,
      {
        params: {
          page: pagination.page,
        },
       
        
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
    const response = await axios.get(`posts/likes/${username}`, {
      params: {
        page: pagination.page,
      },
      
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
    await axios.post(`posts`, post);
  } catch (error) {
    console.error("veri kaydederken hata oluştu:", error);
  }
};

const like = (post, LoginUserId) => async (dispatch) => {
  try {
    // Sunucuya beğeni isteği gönder
    const response = await axios.post(
      `posts/like/${post._id}/${LoginUserId}`
    );
    const newPost =await {
      ...post,
      likes: new Set(post.likes).has(LoginUserId)
        ? post.likes
        : [...post.likes, LoginUserId],
      likesCount:
        new Set(post.likes).has(LoginUserId) === false && post.likesCount + 1,
    };

    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setUbdateData(newPost));
      // Başarılı beğeni işlemi
      console.log("Post beğenildi");
    }
  } catch (error) {
    // Beklenmeyen hataları ele al
    console.log(error.message);
  }
};

const unLike = (post, LoginUserId) => async (dispatch) => {
  try {
// Sunucuya beğeni geri alma isteği gönder
    const response = await axios.post(
      `posts/unlike/${post._id}/${LoginUserId}`);
    const newPost =await {
      ...post,
      likes:
        new Set(post.likes).has(LoginUserId) &&
        post.likes.filter((id) => id !== LoginUserId),
      likesCount:
        new Set(post.likes).has(LoginUserId) === true && post.likesCount - 1,
    };
    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      dispatch(setUbdateData(newPost));
      console.log("Post beğenisi geri alındı");
    }
  } catch (error) {
    // Beklenmeyen hataları ele al
    console.log(error.message);
  }
};

const favorite = (post, loginedUserId) => async (dispatch) => {
  try {
    const response = await axios.post(
      `posts/favorites/${post._id}/${loginedUserId}`);
    
    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      const newPost = await{
        ...post,
        favorites: new Set(post.favorites).has(loginedUserId)
          ? post.favorites
          : [...post.favorites, loginedUserId],
      };
  
      dispatch(setUbdateData(newPost));
      // Başarılı beğeni işlemi
      console.log("favoriye eklendi");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const unFavorite = (post, loginedUserId) => async (dispatch) => {
  try {
    const response = await axios.post(
      `posts/unfavorites/${post._id}/${loginedUserId}`);
    

    // Potansiyel hatalar için API yanıtını kontrol et
    if (response.status === 200) {
      const newPost =await {
        ...post,
        favorites: new Set(post.favorites).has(loginedUserId)
          ? post.favorites.filter((id) => id !== loginedUserId)
          : post.favorites,
      };
      dispatch(setUbdateData(newPost));
      // Başarılı beğeni işlemi
      console.log("favoriden çıkarıldı");
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
  getProfilePosts,
  getProfileLikesPosts,
  like,
  unLike,
  createPost,
};
