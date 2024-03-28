const UserChema = require("../models/User");

const userControlIsFollow = async (users, loggedInUserId) => {
  //giriş yapan kullanıcının takipçilerini getir
  const loggedInUser = await UserChema.findById(loggedInUserId);
  const followerIds = loggedInUser.following;

  const updatedUsers = users.map((user) => ({
    ...user,
    isFollow: followerIds.includes(user._id.toString()),
  }));
  return updatedUsers;
};
module.exports = userControlIsFollow;
