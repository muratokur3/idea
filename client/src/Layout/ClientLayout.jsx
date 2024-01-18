import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLogin, setUser } from "../redux/slices/AuthenticationSlice";
import { fetchUsers } from "../redux/actions/UserActions";
import { getHashtags } from "../redux/actions/HashtagsAction";
import Sidebar from "../components/Sidebar";
import Login from "../Modals/Auth";
import NewPostPage from "../Modals/NewPostPage";
import "./scss/layout.scss";

const ClientLayout = () => {
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
      {ui.loginPage && <Login />}
      {ui.newPostPage && <NewPostPage />}
      <Sidebar />
      <div id="layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ClientLayout;
