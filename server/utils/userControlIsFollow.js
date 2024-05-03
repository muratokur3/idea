const UserChema = require("../models/User");

const userControlIsFollow = async (users, loggedInUserId) => {
  if (!loggedInUserId) {
    return users;
  }
  //giriş yapan kullanıcının takipçilerini getir
  const loggedInUser = await UserChema.findById(loggedInUserId).lean();
  
  const followerIds = loggedInUser.following;
  const stringFollowerIds = followerIds.map(id => id.toString());



  const updatedUsers = users.map((user) => ({
    ...user,
    isFollow: stringFollowerIds.includes(user._id.toString()),
  }));
  return updatedUsers;
};
module.exports = userControlIsFollow;