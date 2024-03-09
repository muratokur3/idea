import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GifBoxIcon from "@mui/icons-material/GifBox";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import "./scss/new-post.scss";
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setNewPostPage } from "../../redux/slices/UiSlice";
import { createPost } from "../../redux/actions/PostActions";
import { getHashtags } from "../../redux/actions/HashtagsAction";
const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const hashtags = useSelector((state) => state.hashtags.hashtags);
  const user = useSelector((state) => state.authentication.user);
  const newPostPage = useSelector((state) => state.ui.newPostPage);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      title: title,
      content,
      hashtags: selectedHashtags.map((hashtag) => hashtag._id),
    };
    dispatch(createPost(newPost));
    setContent("");
    setTitle("");
    setSelectedHashtags([]);
    dispatch(setNewPostPage(false));
  };

  useEffect(() => {
    hashtags.length > 0 && dispatch(getHashtags());
  }, []);

  return (
    <Box  sx={{
      width: "100%",
      height: "auto",
      minHeight: "20vh",
      maxHeight: "50vh",
      display: "flex",
      padding: "1rem",
      gap: "1rem",
      position: "relative",
    }}>
      <Avatar
        alt="Remy Sharp"
        src={user?.avatar}
        sx={{ width: 80, height: 80 }}
      />
      <form onSubmit={handleSubmit} id="new-post-form">
        <Typography
          sx={{
            color: "rgba(105, 102, 102, 0.697)",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          {175 - title.length}
        </Typography>

        <TextareaAutosize
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          minRows={3}
          maxRows={3}
          maxLength={175}
          placeholder="Başlık"
          sx={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: "1.1rem",
            maxHeight: "500px",
            resize: "none",
            background: "none",
            overflow: "hidden",
            borderBottom: "1px solid rgba(171, 164, 164, 0.937)",
            "&::placeholder": {
              fontSize: "1.1rem",
            },
            fontFamily: "monospace",
          }}
          required
        />
        <TextareaAutosize
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          minRows={3}
          maxLength={1500}
          placeholder="Açıklama"
          sx={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: "1rem",
            maxHeight: "500px",
            resize: "none",
            background: "none",
            overflow: "hidden",
            paddingTop: "5px",
            "&::placeholder": {
              fontSize: "1rem",
            },
            marginBottom: "20px",
            fontFamily: "monospace",
          }}
          required
        />
        <Typography
          sx={{
            color: "rgba(105, 102, 102, 0.697)",
            position: "absolute",
            top: "33%",
            right: 0,
          }}
        >
          {1500 - content.length}
        </Typography>
        <Autocomplete
          onChange={(e, value) => {
            setSelectedHashtags(value);
          }}
          className="new-post-hashtag"
          sx={{ color: "white" }}
          value={selectedHashtags}
          multiple
          limitTags={3}
          id="multiple-limit-tags"
          options={hashtags}
          getOptionLabel={(option) => "#" + option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="#hashtag"
              placeholder="#"
              sx={{
                "& .MuiInputBase-input::placeholder": { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />
          )}
          PaperComponent={({ children }) => (
            <Paper sx={{ backgroundColor: "black" }}>{children}</Paper>
          )}
        />
        {/* <hr className="new-post-hr" /> */}
        <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingTop: "2%",
          borderTop: ".5px solid rgba(71, 67, 67, 0.403)",
        }}>
          <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "30%",
            height: "2rem",

          }}>
            <AddAPhotoIcon sx={{ fontSize: 30 }} />
            <AddPhotoAlternateIcon sx={{ fontSize: 30 }} />
            <GifBoxIcon sx={{ fontSize: 30 }} />
            <AddLocationAltIcon sx={{ fontSize: 30 }} />
          </Box>
          <Button type="submit" variant="outlined"
          sx={{
            borderRadius: "60px",
            width: "100px",
            height: "40px",
            fontSize: ".5rem",
            color: "white",
            borderColor: "gray",
            "&:hover": {
              borderColor: "white",
            },
          }}>
            Paylaş
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewPost;
