import { Outlet } from "react-router-dom";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import "./scss/admin-layout.scss";
const AdminLayout = () => {
  return (
    <div id="admin-layout-container">
      <Header />
      <div id="admin-layout-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

{
  /* <div id="admin-layout-container">
<div id="left-box">
  <Sidebar />
</div>
<div id="rightbox">
  <Header />
  <div id="admin-layout-content">
    <Outlet />
  </div>
</div>
</div> */
}
