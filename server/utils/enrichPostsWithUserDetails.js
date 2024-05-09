const UserChema = require("../models/User");
const HashtagChema = require("../models/Hashtag");

const userControlIsFollow = require("./userControlIsFollow.js");


//giriş yapan kullanıcı bu kullanıcıları takip edip etmediği bilgisini ekler
const enrichPostsWithUserDetails = async (posts, loggedInUserId) => {
  // isDeleted özelliği true olan postları filtrele
  posts = posts.filter((post) => !post.isDeleted);

  // Benzersiz kullanıcı ID'lerini topla
  const userIds = posts.map((post) => post.userId);

  // Tek bir sorgu ile tüm kullanıcı detaylarını al
  const allUsers = await UserChema.find({
    _id: { $in: userIds },
    isActive: true,
  }).lean();
  let userDetails = allUsers;
  if (loggedInUserId) {
    userDetails = await userControlIsFollow(allUsers, loggedInUserId);
  }
  // Benzersiz hashtag ID'lerini topla
  const hashtagIds = posts.reduce((acc, post) => {
    if (post.hashtags.length > 0) {
      acc.push(...post.hashtags.map((hashtag) => hashtag.toString()));
    }
    return acc;
  }, []);

  // Tüm hashtag detaylarını al
  const hashtagDetails = await HashtagChema.find({
    _id: { $in: hashtagIds },
  });

  // Postları kullanıcı detayları ile birleştir
  const postUser = posts
    .map((post) => {
      const hashtags = hashtagDetails
        .filter((hashtag) => post.hashtags.includes(hashtag._id?.toString()))
        .map((hashtag) => {
          return { _id: hashtag._id, name: hashtag.name };
        });
      if (!hashtags.length) {
        console.error('No matching hashtags found');
        return;
      }
      const user = userDetails.find(
        (user) => post.userId && post.userId.toString() === user._id?.toString()
      );
      if (!user) {
        console.error('No matching user found');
        return;
      }
      return {
        ...post._doc,
        name: user.name,
        surname: user.surname,
        isFollow: user.isFollow,
        isFavorite: post.favorites.includes(loggedInUserId),
        isLike: post.likes.includes(loggedInUserId),
        avatar: user.avatar,
        username: user.username,
        hashtags: hashtags,
      };
    })
    .filter((post) => post != null);
    
  return postUser;
};

module.exports = enrichPostsWithUserDetails;
