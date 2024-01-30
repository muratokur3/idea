import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLogin, setUser } from "../redux/slices/AuthSlice";
import { getHashtags } from "../redux/actions/HashtagsAction";
import Sidebar from "../components/Sidebar";
import Auth from "../Modals/Auth";
import NewPostPage from "../Modals/NewPostPage";
import "./scss/client-layout.scss";

const ClientLayout = () => {
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getHashtags());
    if (localStorage.getItem("isLogin")=== "true") {
      dispatch(setLogin(true));
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    } else {
      dispatch(setLogin(false));
      dispatch(setUser({}));
    }

    if (ui.authPage || ui.newPostPage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ui]);
  return (
    <div id="layout-container">
      {ui.authPage && <Auth />}
      {ui.newPostPage && <NewPostPage />}
      <Sidebar />
      <div id="layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ClientLayout;
