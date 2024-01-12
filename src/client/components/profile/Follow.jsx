import {  useSelector } from "react-redux"
import UserCard from "./UserCard"
import { useEffect, useState } from "react"
import axios from "axios"

const Follow = () => {
  const followers = useSelector((state) => state.profile.followers)
const [users,setUsers]=useState([]);
const getFollowersUSer=async()=>{
const response =await axios.get(`http://localhost:3005/users`,{params:{id:followers}});
 setUsers(response.data);
}

  useEffect(() => {
   getFollowersUSer();
  }
, [followers])
  return (
    <ul>
      {users.map((user,index) => (
        <UserCard key={index} user={user} />
      ))}
    </ul>
  )
}

export default Follow