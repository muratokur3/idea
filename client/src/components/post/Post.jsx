import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IosShareIcon from "@mui/icons-material/IosShare";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import { Avatar, Box, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { useState } from "react";
import ActionsButton from "../../Modals/ActionsButton";
import LikeActions from "../actions/LikeActions";
import FavoriteActions from "../actions/FavoriteActions";
import { useTheme } from "@mui/material/styles";
import FollowActions from "../actions/FollowActions";

const Post = ({ post }) => {
  const logginedUser = useSelector((state) => state.session && state.session.user);
  const logginedUserId = logginedUser._id;

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();
  const theme = useTheme();
  const webSiteUrl = import.meta.env.VITE_WEBSITE_BASE_URL;
  return (
    <Card
      sx={{
        width: "100%",
        padding: "1%",
        marginTop: "10px",
        borderRadius: "30px",
        boxShadow: "none",
        background: `${theme.palette.postBackground.default}`,
      }}
    >
      <CardHeader
      sx={{paddingBottom:".5rem"}}
        avatar={
          <Avatar
            src={post?.avatar}
            sx={{ bgcolor: red[500], width: "50px", height: "50px" }}
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        action={
          <Box display={"flex"}>
            {logginedUserId && (
              <Box>
                {post?.userId !== logginedUserId &&
                  (new Set(logginedUser?.following).has(post?.userId) ? (
                    <Typography color="primary" sx={{ fontSize: "10px" }}>
                      Takibi Edilen
                    </Typography>
                  ) : (
                   <FollowActions toFollowUserId={post?.userId}/>
                  ))}
              </Box>
            )}
            <ActionsButton
              actions={[
                {
                  label: "Bildir",
                  onClick: () => {
                    alert("bildir");
                  },
                },
                post?.userId === logginedUserId && {
                  label: "Sil",
                  onClick: () => {
                    alert("sil");
                  },
                },
              ]}
            />
          </Box>
        }
        title={post?.name + " " + post?.surname}
        titleTypographyProps={{fontSize:"1.3rem", color: "primary" }}
        subheader={
          <Typography
            color="secondary"
            onClick={() => navigate(`/${post?.username}`)}
            sx={{ cursor: "pointer" }}
          >
            @{post?.username}
          </Typography>
        }
      />

      <CardContent>
        <Typography
          variant="body1"
          color="primary"
          marginBottom="1rem"
          sx={{ cursor: "pointer" }}
          onClick={() =>
            navigate(`/explore/post/${post?.username}/${post?._id}`)
          }
        >
          {post?.title}
        </Typography>
        {post?.hashtagsName?.map((hashtag) => (
          <Button
          variant="outlined"
          size="small"
            key={hashtag}
            sx={{
              textDecoration: "none",
              display: "inline-block",
              margin: ".4rem",

              color: `${theme.palette.primary.main}`,
              border: `.5px solid grey`,
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={()=>navigate(`/explore/${hashtag}`)}
          >
            {hashtag}
          </Button>
        ))}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          
              <LikeActions post={post} logginedUserId={logginedUserId}/>
              <FavoriteActions post={post} logginedUserId={logginedUserId} />

          <IconButton
            aria-label="share"
            onClick={async () => {
              if (navigator.share) {
                navigator
                  .share({
                    title: "Şahane fikir", // İsteğe bağlı
                    text: "idea sitesinde çok güzel bir fikir buldum", // İsteğe bağlı
                    url: `${webSiteUrl}/explore/post/${post.username}/${post._id}`, // İsteğe bağlı
                  })
                  .catch((error) => console.log("Paylaşım hatası", error));
              } else {
                // navigator.share API'si desteklenmiyor
                console.log("Paylaşım API'si desteklenmiyor");
              }
            }}
          >
            <IosShareIcon />
          </IconButton>
        </Box>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
          <Typography fontSize={12} color="primary" padding="10px">
            detaylar
          </Typography>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent background={`${theme.palette.postBackground.default}`}>
          <Typography color="primary" paragraph>
            {post?.content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
Post.propTypes = {
  post: PropTypes.object,
  logginedUser: PropTypes.object,
};
