import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import "./scss/layout.scss"
import Hashtag from "./Hashtag"
import {useSelector } from "react-redux"
import NewPostPage from "../post/NewPostPage"
import Login from "../acoount/Login"
const Layout = () => {
  const ui=useSelector((state) => state.ui);
console.log(ui);
  return (
    <div id="layout-container">
        <Sidebar/>
        <div id="layout-content">
        <Outlet/>
        </div>
        <Hashtag/>
        {ui.loginPage&&<Login/>}
        {ui.newIdeaPage&& 
        <NewPostPage/>
       }
    </div>
  )
}

export default Layout