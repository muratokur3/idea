import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GifBoxIcon from "@mui/icons-material/GifBox";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import "./scss/new-post.scss";
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setNewPostPage } from "../../redux/slices/UiSlice";
import { createPost } from "../../redux/actions/PostActions";
const NewPost = () => {
  const [content, setContent] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const hashtags = useSelector((state) => state.hashtags);
  console.log(hashtags);
  const yeni = hashtags.map((hashtag) => hashtag.name);
  const user = useSelector((state) => state.authentication.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user.id,
      content,
      createDate: "October 1, 2023",
      likes: [],
      isDeleted: false,
      hashtags: selectedHashtags,
    };
    dispatch(createPost(newPost));
    setContent("");
    setSelectedHashtags([]);
    dispatch(setNewPostPage(false));
  };
 
  return (
    <div id="share-container">
      <Avatar
        alt="Remy Sharp"
        src={`http://${user.avatar}`}
        sx={{ width: 80, height: 80 }}
      />
      <form onSubmit={handleSubmit} id="new-post-form">
        <TextareaAutosize
          className="new-post-textarea"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          aria-label="minimum height"
          minRows={3}
          placeholder="Ne buldun acaba?"
          sx={{
            marginBottom: "20px",
            fontFamily: "monospace",
            fontSize: ".9rem",
          }}
          required
        />
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
          options={yeni}
          getOptionLabel={(option) => option}
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
        <div className="new-post-media">
          <div className="new-post-media-icons">
            <AddAPhotoIcon sx={{ fontSize: 30 }} />
            <AddPhotoAlternateIcon sx={{ fontSize: 30 }} />
            <GifBoxIcon sx={{ fontSize: 30 }} />
            <AddLocationAltIcon sx={{ fontSize: 30 }} />
          </div>
          <Button type="submit" id="new-post-submit" variant="outlined">
            Paylaş
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
