const UserChema = require("../models/User");



const enrichProjectWithUserDetails = async (projects, username) => {
    // isDeleted özelliği true olan projeleri filtrele
    projects = projects.filter((project) => !project.isDeleted);
    const userIds = projects.map((project) => project.userId);
    const userDetails = await UserChema.find({
      _id: { $in: userIds },
      isActive: true,
    });
  
    // Projeleri detayları ile birleştir
    const projectUser = projects
      .map((project) => {
        if (
          userDetails.find(
            (user) => user._id.toString() === project.userId.toString()
          )
        ) {
          return {
            ...project._doc,
            username: username,
          };
        }
        return null;
      })
      .filter((project) => project != null);
    return projectUser;
  };
  
    module.exports = enrichProjectWithUserDetails;