/* eslint-disable react/prop-types */
import "./scss/post.scss";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Avatar, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Post = ({ post }) => {
  
  return (
    <Card id="card-container">
      <CardHeader
      className="card-header"
        avatar={
          <Avatar
          alt="Remy Sharp"
          src="src/assets/muratokur.jpeg"
          sx={{ width: 50, height: 50 ,}}
        />
        }
        action={
          <IconButton aria-label="settings" sx={{ width: 50, height: 50,}}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Box display="flex" alignItems="center" gap={2}>
          <Typography>
          {post.userId}
        </Typography>
        <Typography sx={{color: 'gray', fontSize:".8rem" }}>
        @{post.userId}
      </Typography>
      </Box>
        }
         subheader={
    <Typography sx={{ color: 'gray', fontSize:".7rem"}}>
      September 14, 2016
    </Typography>
  }
      />
      
      <CardContent>
        <Typography variant="body2" color="white">
          {post.content}
          <Typography sx={{ color: 'gray', fontSize:".7rem"}}>

          {post.hashtags.length > 0 && post.hashtags.map((hashtag) => (
           ` ${hashtag}`
          ))}
          </Typography>

        </Typography>
      </CardContent>

      <CardActions className="card-icon">

        <IconButton aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>

        <IconButton aria-label="share">
          <IosShareIcon />
        </IconButton>

        <IconButton aria-label="share">
          <StarBorderIcon />
        </IconButton>
      
      </CardActions>
    </Card>
 
  );
};

export default Post;
