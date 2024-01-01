import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import "./scss/layout.scss"
import Hashtag from "./Hashtag"
import { useDispatch, useSelector } from "react-redux"
import NewPost from "../post/NewPost"
import { Login } from "@mui/icons-material"
import { Button } from "@mui/material"
import {setNewIdeaPage} from '../../../store/UiSlice'
const Layout = () => {
  const ui=useSelector((state) => state.ui);
  const dispatch = useDispatch();
 
  return (
    <div id="layout-container">
        <Sidebar/>
        <div id="layout-content">
        <Outlet/>
        </div>
        <Hashtag/>
        {ui.loginPage&&<Login/>}
        {ui.newIdeaPage&& <div id='new-post-page'>
        <div id='box-new-post'>
        <NewPost/>
        <Button  className='close-new-post-page' onClick={()=>dispatch(setNewIdeaPage(false))}>X</Button>
        </div>
       </div>}
    </div>
  )
}

export default Layout