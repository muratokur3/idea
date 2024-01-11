import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./scss/layout.scss";
import { useDispatch, useSelector } from "react-redux";
import NewPostPage from "../post/NewPostPage";
import Login from "../acoount/Login";
import { useEffect } from "react";
import { setLogin, setUser } from "../../redux/slices/AuthenticationSlice";
import { fetchUsers } from "../../redux/actions/UserActions";
import { getHashtags } from "../../redux/actions/HashtagsAction";


const Layout = () => {
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(getHashtags());
    if (localStorage.getItem("isLogin")) {
      
      dispatch(setLogin(true));
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    } else {
      dispatch(setLogin(false));
    }

    if (ui.loginPage || ui.newPostPage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ui]);
  return (
    <div id="layout-container">
      <Sidebar />
      <div id="layout-content">
        <Outlet />
      </div>
      {ui.loginPage && <Login />}
      {ui.newPostPage && <NewPostPage />}
    </div>
  );
};

export default Layout;
