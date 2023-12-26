import { Outlet } from "react-router-dom"
import './scss/profile-layout.scss'
// import ProfileMenu from "../menu/ProfileMenu"
import UserDetail from "./UserDetail"
const ProfileLayout = () => {
  return (
    <div id="profile-layout-container">
    <UserDetail/>
    <Outlet/>
    </div>
  )
}

export default ProfileLayout