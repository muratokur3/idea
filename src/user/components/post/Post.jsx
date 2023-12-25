/* eslint-disable react/prop-types */
import './scss/post.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Avatar } from '@mui/material';

// Post bileşeninin tanımı


const Post = ({ post }) => {
  return (
    <div id="post-container">
       <Avatar
        alt="Remy Sharp"
        src="src/assets/muratokur.jpeg"
        sx={{ width: 45, height: 45 }}
      />
      <div className="post-content">
        <div className='user-name'><h3>{post.user.name}</h3>
      <h6>@{post.user.username}</h6><p>{post.createDate}</p>
        </div>
      
      <p className='post-text'>
        {post.content}
      </p>
        <div className='icon-box'>
        <FavoriteBorderIcon className='icon'/>
        <IosShareIcon className='icon'/>
        <StarBorderIcon className='icon'/>
        </div>
      </div>
    </div>
  )
}

export default Post