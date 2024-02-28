import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IosShareIcon from "@mui/icons-material/IosShare";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import { Avatar, Box, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { useState } from "react";
import ActionsButton from "../../Modals/ActionsButton";
import { follow } from "../../redux/actions/ProfileAction";
import LikeActions from "../actions/LikeActions";
import FavoriteActions from "../actions/FavoriteActions";
import { useTheme } from "@mui/material/styles";

const Post = ({ post, activeUser }) => {
  const webSiteUrl = import.meta.env.VITE_WEBSITE_BASE_URL;
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const loginUserId = activeUser?._id;
  const theme = useTheme();
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
            {loginUserId && (
              <Box>
                {" "}
                {post?.userId !== loginUserId &&
                  (new Set(activeUser?.following).has(post?.userId) ? (
                    <Typography color="primary" sx={{ fontSize: "10px" }}>
                      Takibi Edilen
                    </Typography>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        dispatch(follow(post?.userId, loginUserId, activeUser))
                      }
                    >
                      Takip Et
                    </Button>
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
                post?.userId === loginUserId && {
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
        titleTypographyProps={{ color: "primary" }}
        subheader={
          <Typography
            color="secondary"
            onClick={() => navigate(`/${post?.username}`)}
            sx={{ fontSize: "0.8rem", cursor: "pointer" }}
          >
            @{post?.username}
          </Typography>
        }
      />

      <CardContent>
        <Typography
          variant="body2"
          color="primary"
          padding="10px"
          onClick={() =>
            navigate(`/explore/post/${post?.username}/${post?._id}`)
          }
        >
          {post?.title}
        </Typography>
        {post?.hashtagsName?.map((hashtag) => (
          <Link
            key={hashtag}
            variant="body3"
            style={{
              textDecoration: "none",
              fontSize: ".8rem",
              display: "inline-block",
              marginRight: "10px",
              color: `${theme.palette.primary.main}`,
              // backgroundColor: "rgba(140, 136, 136, 0.937)",
              border: `1px dotted ${theme.palette.primary.main}`,
              padding: "1% 2%",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            to={`/explore/${hashtag}`}
          >
            {hashtag}
          </Link>
        ))}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          {activeUser._id && (
            <>
              <LikeActions post={post} loginUserId={loginUserId} />
              <FavoriteActions post={post} loginUserId={loginUserId} />
            </>
          )}

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
  activeUser: PropTypes.object,
};
