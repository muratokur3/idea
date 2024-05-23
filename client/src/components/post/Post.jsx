import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import { Avatar, Box, Button } from "@mui/material";
import TopRightButton from "../actions/TopRightButton";
import LikeActions from "../actions/LikeActions";
import FavoriteActions from "../actions/FavoriteActions";
import { useTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Card from "@mui/material/Card";
import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../../Modals";
import CreateOrUpdatePost from "./CreateOrUpdatePost";
import { deletePost } from "../../redux/actions/PostActions";
import ShareAction from "../actions/ShareAction";
const webApiUrl = import.meta.env.VITE_API_BASE_URL;

const Post = ({ post }) => {
  const logginedUser = useSelector(
    (state) => state.session && state.session.user
  );
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const navigate = useNavigate();
  const theme = useTheme();
const dispatch=useDispatch();

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const targetDate = new Date(timestamp);

    const timeDifference = now - targetDate;
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (days === 0) {
      if (hours === 0) {
        return `${minutes} dakika önce`;
      } else {
        return `${hours} saat önce`;
      }
    } else if (days === 1) {
      return "Dün";
    } else {
      // Eğer bir önceki günden daha önce ise sadece tarihi döndür
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return targetDate.toLocaleDateString("tr-TR", options);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        marginTop: "10px",
        borderRadius: "30px",
        boxShadow: "none",
        background: `${theme.palette.postBackground.default}`,
      }}
    >
      <CardHeader
        sx={{ paddingBottom: ".5rem" }}
        avatar={
          <Avatar
            src={webApiUrl + post?.avatar}
            sx={{
              bgcolor: green[900],
              width: "50px",
              height: "50px",
              cursor: "pointer",
            }}
            aria-label="recipe"
            onClick={() => navigate(`/${post?.username}`)}
          >
            {post?.name[0]}
          </Avatar>
        }
        action={
          <Box display={"flex"}>
            {/* post içerisinde kullanıcı takip */}
            {/* {logginedUserId && (
              <Box>
                {post?.userId !== logginedUserId && post.isFollow === false && (
                  <Typography color="primary" sx={{ fontSize: "10px" }}>
                  takip edilmeyen 
                </Typography>
                )}
              </Box>
            )} */}
            <TopRightButton
              actions={[
                post?.username !== logginedUser.username && (
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate(`/${post?.username}`)}
                  >
                    profili ziyaret et
                  </Button>
                ),
                logginedUser && post?.username === logginedUser.username && (
                  <Modal
                  buttonText={"Güncelle"}
                  component={<CreateOrUpdatePost post={post} icon={<DriveFileRenameOutlineIcon/>}/>}
                  />
                ),
                logginedUser && post?.username === logginedUser.username && (
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => dispatch(deletePost(post?._id))}
                  >
                    Sil
                  </Button>
                ),
              ]}
            />
          </Box>
        }
        title={
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/${post?.username}`)}
          >
            {post?.name + " " + post?.surname}
          </Typography>
        }
        titleTypographyProps={{ fontSize: "1.3rem", color: "primary" }}
        subheader={
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography
              color="secondary"
              onClick={() => navigate(`/${post?.username}`)}
              sx={{ cursor: "pointer" }}
            >
              @{post?.username}
            </Typography>
            <Typography variant="caption" color="gray">
              {formatRelativeTime(post?.createdAt)}
            </Typography>
          </Box>
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
        {post?.hashtags?.map((hashtag) => (
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
            onClick={() => navigate(`/explore/${hashtag.name}`)}
          >
            {hashtag.name}
          </Button>
        ))}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <LikeActions post={post} />
          <FavoriteActions post={post} />
          <ShareAction post={post} />
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
        <CardContent>
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
  post: PropTypes.object.isRequired,
};
