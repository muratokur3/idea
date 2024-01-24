import "./scss/post.scss";
import PropTypes from "prop-types";

import { Avatar, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Collapse from "@mui/material/Collapse";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import StarBorderIcon from '@mui/icons-material/StarBorder';
const Post = ({ post }) => {
  const ExpandMore = styled(IconButton)(({ expand }) => ({
    // buraya stilleriniz gelecek
  }));

  ({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  });
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const avatar = `http://${localStorage.getItem("avatar")}`;
  const userId = localStorage.getItem("userId");
  return (
    <Card sx={{ maxWidth: "100%", backgroundColor: "rgba(13, 13, 13, 0.63)",marginTop:"10px" }}>
      <CardHeader
        avatar={
          <Avatar src={avatar} sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Murat OKUR"
        subheader="muratokur3"
        subheaderTypographyProps={{ color: "gray" }}
      />

      <CardContent>
        <Typography variant="body2" color="white">
          {post.title}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton aria-label="like">
            {post.likes.find((userID) => userID === userId) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton aria-label="share">
            <IosShareIcon />
          </IconButton>
          <IconButton aria-label="add to favorites">
            <StarBorderIcon />
          </IconButton>
        </Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{backgroundColor:"gray"}}>
          <Typography paragraph>{post.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;

Post.propTypes = {
  post: PropTypes.object,
};
