import { Route, Routes } from "react-router-dom";
import Layout from "../user/components/layout/Layout";
import ProfileLayout from "../user/components/profile/ProfileLayout"
import Home from "../user/components/home/Home";
import Favorite from "../user/components/favorite/Favorite";
import Settings from '../user/components/settings/Settings'
import ExploreLayout from "../user/components/explore/ExploreLayout";
import ExplorePosts from "../user/components/explore/ExplorePosts";
import ExploreMain from "../user/components/explore/ExploreMain";
function UserRoutes() {
    return (
        <Routes>
          <Route path="/*" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path="explore" element={<ExploreLayout/>}>
              <Route index element={<ExploreMain/>}/>
              <Route path=":hashtag" element={<ExplorePosts/>}/>
            </Route>
            <Route path=":username" element={<ProfileLayout />}/>
            <Route path="favorite" element={<Favorite/>}/>
            <Route path="settings" element={<Settings/>}/>
          </Route>
        </Routes>
    );
  }
  
  function AdminRoutes() {
    return (
        <Routes>
            <Route path="/admin/*" element={<div>Admin</div>}>
            </Route>
        </Routes>
          
    );
  }
  
  function LayoutRoute() {
    return (
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="admin/*" element={<AdminRoutes />} />
        </Routes>
    );
  }
  
  
  
  export default LayoutRoute;