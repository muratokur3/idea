const UserChema = require("../models/User");

const userControlIsFollow = async (users, loggedInUserId) => {
  if (!loggedInUserId) {
    return users;
  }
  //giriş yapan kullanıcının takipçilerini getir
  const loggedInUser = await UserChema.findById(loggedInUserId).lean();
  
  const followerIds = loggedInUser.following;

  const updatedUsers = users.map((user) => ({
    ...user.toObject(),
    isFollow: followerIds.includes(user._id.toString()),
  }));
  // console.log(followerIds.length,updatedUsers.length)
  return updatedUsers;
};
module.exports = userControlIsFollow;