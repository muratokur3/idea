
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Box, Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createPost } from "../../redux/actions/PostActions";
import { getHashtags } from "../../redux/actions/HashtagsAction";
import { useTheme } from "@mui/material/styles";
const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const hashtags = useSelector((state) => state.hashtags.hashtags);
  const user = useSelector((state) => state.session && state.session.user);
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
  };

  useEffect(() => {
    hashtags.length > 0 && dispatch(getHashtags());
  }, []);

const theme=useTheme();






  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        minHeight: "20vh",
        maxHeight: "50vh",
        display: "flex",
        padding: "1rem",
        gap: "1rem",
        background: "none",
        position: "relative",
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src={user?.avatar}
        sx={{ width: 80, height: 80 }}
      />
      <form
        onSubmit={handleSubmit}
        style={{
          width: "90%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          background: "none",
        }}
      >
     
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
          style={{
          width: "100%",
            border: "none",
            outline: "none",
            fontSize: "1.1rem",
            maxHeight: "500px",
            resize: "none",
            overflow: "hidden",
            borderBottom: "1px solid rgba(171, 164, 164, 0.937)",
            "&::placeholder": {
              fontSize: "1.1rem",
            },
            fontFamily: "monospace",
            background: "none",
            color: `${theme.palette.primary.main}`,
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
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: "1rem",
            maxHeight: "500px",
            resize: "none",
            overflow: "hidden",
            paddingTop: "5px",
            "&::placeholder": {
              fontSize: "1rem",
            },
            marginBottom: "20px",
            fontFamily: "monospace",
            background: "none", // Arka plan rengini kaldır
            color: `${theme.palette.primary.main}`,
          }}
          required
        />


        <Autocomplete
          onChange={(e, value) => {
            setSelectedHashtags(value);
          }}
          className="new-post-hashtag"
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
                style: {color: `${theme.palette.primary.main}`,
              },
              }}
            />
          )}
          PaperComponent={({ children }) => (
            <Paper sx={{ backgroundColor: `${theme.palette.mode === "dark" ? "black" : "primary"}` }}>{children}</Paper>
          )}
        />


        <Button
          type="submit"
          id="new-post-submit"
          variant="outlined"
          sx={{
            borderRadius: "60px",
            marginTop: "2%",
            width: "100%",
            height: "40px",
            fontSize: ".6rem",
            fontFamily: "monospace",
            color: "primary",
            borderColor: "gray",
            "&:hover": {
              borderColor: "white",
            },
          }}
        >
          Paylaş
        </Button>
      </form>
    </Box>
  );
};

export default NewPost;
