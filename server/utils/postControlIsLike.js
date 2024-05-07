const UserChema = require("../models/User");

const postControlIsLike = async (posts,loggedInUserId) => {

  //gelen postların likes dizisini kontrol et. loggedInUserId var ise  isLike: True özelliği ekle yok ise isLike özelliğini false olarak ayarla
    const updatedPosts = posts.map((post) => ({
        ...post,
        isLike: post.likes.includes(loggedInUserId),
    }));
    return updatedPosts;
};
module.exports = postControlIsLike;