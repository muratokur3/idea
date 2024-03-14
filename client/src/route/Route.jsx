import ExplorePosts from "../components/explore/ExplorePosts";
import ExploreMain from "../components/explore/ExploreMain";
import HashtagsPage from "../admin/pages/HashtagsPage";
import ProjectsPage from "../admin/pages/ProjectsPage";
import DashboardPage from '../admin/pages/DashboardPage';
import ClientLayout from "../Layout/ClientLayout";
import { Route, Routes } from "react-router-dom";
import PostsPage from "../admin/pages/PostsPage";
import UsersPage from "../admin/pages/UsersPage";
import AdminLayout from "../Layout/AdminLayout";
import SingleProject from "../pages/SingleProject";
import SinglePost from "../pages/SinglePost";
import Favorite from "../pages/Favorite";
import Settings from "../pages/Settings";
import Explore from "../pages/Explore";
import Profile from "../pages/Profile";
import MyLikes from "../pages/MyLikes";
import Home from "../pages/Home";

function ClientRoutes() {
  return (
        <Routes>
          <Route path="/*" element={<ClientLayout/>}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore/>}>
              <Route index element={<ExploreMain/>}/>
              <Route path=":hashtag" element={<ExplorePosts/>}/>
              <Route path="post/:username/:id" element={<SinglePost/>}/>
              <Route path="project/:username/:id" element={<SingleProject/>}/>
            </Route>
            <Route path=":username" element={<Profile />}/>
            <Route path="favorite" element={<Favorite/>}/>
            <Route path="MyLikes" element={<MyLikes/>}/>
            <Route path="settings" element={<Settings/>}/>
          </Route>
        </Routes>
    );
  }
  
  // function AdminRoutes() {
  //   return (
  //       <Routes>
  //           <Route path="/*" element={<AdminLayout/>}>
  //             <Route index element={<DashboardPage/>} />
  //             <Route path="users" element={<UsersPage/>} />
  //             <Route path="posts" element={<PostsPage/>} />
  //             <Route path="projects" element={<ProjectsPage/>} />
  //             <Route path="hashtags" element={<HashtagsPage/>} />
  //           </Route>
  //       </Routes>
          
  //   );
  // }
  
  function LayoutRoute() {
    return (
        <Routes>
          <Route path="/*" element={<ClientRoutes />} />
          {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
        </Routes>
    );
  }
  
  export default LayoutRoute;