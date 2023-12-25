import { Route, Routes } from "react-router-dom";
import Layout from "../user/components/layout/Layout";
import ProfileLayout from "../user/components/profile/ProfileLayout"
import Detail from "../user/components/profile/Detail"
import ProfileMain from "../user/components/profile/ProfileMain"
import Home from "../user/components/home/Home";
import Best from '../user/components/best/Best'
import Favorite from "../user/components/favorite/Favorite";
import Likes from "../user/components/profile/Likes";
import Project from '../user/components/profile/Project'
import Settings from '../user/components/settings/Settings'
function UserRoutes() {
    return (
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="best" element={<Best/>}/>
            <Route path="favorite" element={<Favorite/>}/>
            <Route path="profile" element={<ProfileLayout />}>
              <Route index element={<ProfileMain />} />
              <Route path="like" element={<Likes />} />
              <Route path="detail" element={<Detail />} />
              <Route path="project" element={<Project />} />
            </Route>
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