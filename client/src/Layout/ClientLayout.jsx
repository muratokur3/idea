import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Auth from "../Modals/Auth";
import NewPostPage from "../Modals/NewPostPage";
import "./scss/client-layout.scss";

const ClientLayout = () => {

  return (
    <div id="layout-container">
      {<Auth />}
      {<NewPostPage />}
      <Sidebar />
      <div id="layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ClientLayout;
