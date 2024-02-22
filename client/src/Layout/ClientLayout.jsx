import { Outlet } from "react-router-dom";
import {  useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Auth from "../Modals/Auth";
import NewPostPage from "../Modals/NewPostPage";
import "./scss/client-layout.scss";

const ClientLayout = () => {
  const ui = useSelector((state) => state.ui);

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
