/* eslint-disable react/prop-types */
import "./scss/post.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Avatar, Box, Fade, Menu, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useSelector } from "react-redux";

const Post = ({ post }) => {
  const users = useSelector((state) => state.users);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userNameSurame = users.map((user) => {
    if (user.id === post.userId) {
      return `${user.name} ${user.surname}`;
    }
  });

  const username = users.map((user) => {
    if (user.id === post.userId) {
      return user.username;
    }
  });

  return (
    <Card id="card-container">
      <CardHeader
        className="card-header"
        avatar={
          <Avatar
            alt="Remy Sharp"
            src="src/assets/muratokur.jpeg"
            sx={{ width: 50, height: 50 }}
          />
        }
        action={
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              PaperProps={{
                style: {
                  backgroundColor: "black",
                  color: "white",
                  padding: "5px",
                },
              }}
            >
              <MenuItem onClick={handleClose}>Görmek istemediğim</MenuItem>
              <MenuItem onClick={handleClose}>Kişiyi Engelle</MenuItem>
              <MenuItem onClick={handleClose}>Bildir</MenuItem>
            </Menu>
          </>
        }
        title={
          <Box display="flex" alignItems="center" gap={2}>
            <Typography>{userNameSurame}</Typography>
            <Typography sx={{ color: "gray", fontSize: ".8rem" }}>
              @{username}
            </Typography>
          </Box>
        }
        subheader={
          <Typography sx={{ color: "gray", fontSize: ".7rem" }}>
            September 14, 2016
          </Typography>
        }
      />

      <CardContent>
        <Typography variant="body2" color="white">
          {post.content}
          {/* burada kullanılan box/div p etiketinin dışına çıkartılmalı */}
          <Box>
            <Typography
              sx={{ color: "gray", fontSize: ".7rem", wordSpacing: "10px" }}
            >
              {post.hashtags.length > 0 &&
                post.hashtags.map((hashtag) => ` ${hashtag}`)}
            </Typography>
          </Box>
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
