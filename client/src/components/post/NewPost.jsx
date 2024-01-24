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
import { useEffect, useState } from "react";
import { setNewPostPage } from "../../redux/slices/UiSlice";
import { createPost } from "../../redux/actions/PostActions";
const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const hashtags = useSelector((state) => state.hashtags);
  const user = useSelector((state) => state.authentication.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user.id,
      title:title,
      content,
      hashtags: selectedHashtags.map((hashtag) => hashtag._id),
    };
    dispatch(createPost(newPost));
    setContent("");
    setSelectedHashtags([]);
    dispatch(setNewPostPage(false));
  };
 useEffect(() => {
  console.log(selectedHashtags.map((hashtag) => hashtag._id));
  }
  ,[selectedHashtags])

  return (
    <div id="share-container">
      <Avatar
        alt="Remy Sharp"
        src={`http://${user.avatar}`}
        sx={{ width: 80, height: 80 }}
      />
      <form onSubmit={handleSubmit} id="new-post-form">
      <p style={{color:"rgba(105, 102, 102, 0.697)",position:"absolute",top:0,right:0}}>{175-title.length}</p>

      <TextareaAutosize
          className="title-textarea"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          minRows={3}
          maxRows={3}
          maxLength={175}
          placeholder="Başlık"
          sx={{
            marginBottom: "20px",
            fontFamily: "monospace",
            fontSize: ".9rem",
          }}
          required
        />
        <TextareaAutosize
          className="content-textarea"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          minRows={3}
          maxLength={1500}
          placeholder="Açıklama"
          sx={{
            marginBottom: "20px",
            fontFamily: "monospace",
            fontSize: ".9rem",
          }}
          required
        />
         <p style={{color:"rgba(105, 102, 102, 0.697)",position:"absolute",top:"33%",right:0}}>{1500-content.length}</p>
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
          getOptionLabel={(option) => "#"+option.name}
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
