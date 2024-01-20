/* eslint-disable react/prop-types */
import './scss/profile-menu.scss'
import { Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setProfilePage } from '../../redux/slices/UiSlice';

const ProfileMenu = () => {
  const dispatch = useDispatch()
  const profilePage=useSelector((state)=>state.ui.profilePage)
  return (
    <div id='profile-menu-container'>
        <Tabs value={profilePage} centered textColor="white">
          <Tab
            value={"posts"}
            label="Fikirler"
            onClick={() => dispatch(setProfilePage("posts"))}
          />
          <Tab
            value={"like"}
            label="Beğenilen"
            onClick={() => dispatch(setProfilePage("like"))}

          />
          <Tab
            value={"follow"}
            label="Takip"
            onClick={() => dispatch(setProfilePage("follow"))}

          />
          <Tab
            value={"detail"}
            label="Hakkında"
            onClick={() => dispatch(setProfilePage("detail"))}

          />
          <Tab
            value={"project"}
            label="Projeler"
            onClick={() => dispatch(setProfilePage("project"))}
          />
        </Tabs>
    </div>
  )
}

export default ProfileMenu