
const userControlIsFaworite = async (posts,loggedInUserId) => {
  //gelen postların likes dizisini kontrol et. loggedInUserId var ise  isLike: True özelliği ekle yok ise isLike özelliğini false olarak ayarla
    const updatedPosts = posts.map((post) => ({
        ...post,
        isFaworite: post.favorites.includes(loggedInUserId),
    }));
    return updatedPosts;
};
module.exports = userControlIsFaworite;