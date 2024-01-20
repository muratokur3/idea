import Home from "../pages/Home";
import ClientLayout from "../Layout/ClientLayout";
import ExploreLayout from "../Layout/ExploreLayout";
import ExploreMain from "../components/explore/ExploreMain";
import ExplorePosts from "../components/explore/ExplorePosts";
import Profile from "../pages/Profile";
import Favorite from "../pages/Favorite";
import Settings from "../pages/Settings";
import AdminLayout from "../Layout/AdminLayout";
import { Route, Routes } from "react-router-dom";
import Users from "../admin/components/Users";

function ClientRoutes() {
    return (
        <Routes>
          <Route path="/*" element={<ClientLayout/>}>
            <Route index element={<Home />} />
            <Route path="explore" element={<ExploreLayout/>}>
              <Route index element={<ExploreMain/>}/>
              <Route path=":hashtag" element={<ExplorePosts/>}/>
            </Route>
            <Route path=":username" element={<Profile />}/>
            <Route path="favorite" element={<Favorite/>}/>
            <Route path="settings" element={<Settings/>}/>
          </Route>
        </Routes>
    );
  }
  
  function AdminRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<AdminLayout/>}>
              <Route index element={<Users/>} />
            </Route>
        </Routes>
          
    );
  }
  
  function LayoutRoute() {
    return (
        <Routes>
          <Route path="/*" element={<ClientRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
    );
  }
  
  export default LayoutRoute;