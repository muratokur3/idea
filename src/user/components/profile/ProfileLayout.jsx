import { Outlet, useParams } from "react-router-dom"
import './scss/profile-layout.scss'
import UserDetail from "./UserDetail"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
const ProfileLayout = () => {
  const [user,setUser]=useState({});
  const {username}=useParams();
  const users=useSelector((state)=>state.users);
  useEffect(() => {
    return setUser(users.find(user=>user.username===username))
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [username])
  return (
    <div id="profile-layout-container">
    <UserDetail user={user}/>
    <Outlet/>
    </div>
  )
}

export default ProfileLayout