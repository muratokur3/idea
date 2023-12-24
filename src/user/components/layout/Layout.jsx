import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import "./scss/layout.scss"
import Hashtag from "./Hashtag"
const Layout = () => {
  return (
    <div id="layout-container">
        <Sidebar/>
        <div id="layout-content">
        <Outlet/>
        </div>
        <Hashtag/>
    </div>
  )
}

export default Layout