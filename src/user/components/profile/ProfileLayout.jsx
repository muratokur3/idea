import { Outlet } from "react-router-dom"
import './scss/profile-layout.scss'
import ProfileMenu from "../menu/ProfileMenu"
const ProfileLayout = () => {
  return (
    <div id="profile-layout-container">
      <div id="profile-head">
      </div>
      <ProfileMenu/>
    <Outlet/>
    </div>
  )
}

export default ProfileLayout