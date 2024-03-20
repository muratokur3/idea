import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Box, Button, Paper, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createPost } from "../../redux/actions/PostActions";
import { getHashtags } from "../../redux/actions/HashtagsAction";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

import styled from "@emotion/styled";
const NewPost = ({modalAction}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const hashtags = useSelector((state) => state.hashtags.hashtags);
  const user = useSelector((state) => state.session && state.session.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
  if(selectedHashtags.length > 0&&selectedHashtags.length < 6)
    {
      const newPost = {
        userId: user._id,
        title: title,
        content,
        hashtags: selectedHashtags.map((hashtag) => hashtag._id),
      };
      dispatch(createPost(newPost));
      modalAction.handleClose();
      setContent("");
      setTitle("");
      setSelectedHashtags([]);
    }
    else alert("En az 1 hashtag seçmelisiniz");
  };

  const TypographyLength = styled(Typography)({
    fontSize: "1rem",
    textAlign: "end",
  });

  const theme = useTheme();
  const isPhone = useMediaQuery("(max-width: 600px)");
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: isPhone ? "column" : "row",
        padding: "1rem",
        gap: "1rem",
        background: "none",
      }}
    >
      <Box>
        <Avatar
          alt="Remy Sharp"
          src={user?.avatar}
          sx={{ width: "5vh", height: "5vh", marginBottom: "1rem" }}
        />
      </Box>

      <Box width="100%">
        <TextareaAutosize
          className="title-textarea"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          minRows={3}
          maxLength={175}
          placeholder="Başlık"
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: isPhone ? "1rem" : "1.1rem",
            borderBottom: ".2rem solid rgba(107, 103, 103, 0.171)",
            maxHeight: "80px",
            padding: "5px",
            resize: "none",
            lineHeight: "1.5",
            overflow: "hidden",
            "&::placeholder": {
              fontSize: "1.1rem",
            },
            fontFamily: "monospace",
            background: "none",
            color: `${theme.palette.primary.main}`,
          }}
          required
        />
        <TypographyLength color={175 - title.length === 0 ? "red" : "gray"}>{175 - title.length}</TypographyLength>
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
            fontSize: isPhone ? ".8rem" : "1.1rem",
            maxHeight: "500px",
            resize: "none",
            lineHeight: "1.5",
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
        <TypographyLength  color={1500 - content.length === 0 ? "red" : "gray"}>{1500 - content.length}</TypographyLength>
        <Autocomplete
          onChange={(e, value) => {
            ( value.length < 6) &&
              setSelectedHashtags(value);
          }}
          className="new-post-hashtag"
          value={selectedHashtags}
          multiple
          size={isPhone ? "small" : "medium"}
          limitTags={3}
          id="multiple-limit-tags"
          options={hashtags}
          getOptionLabel={(option) => "#" + option.name}
          renderInput={(params) => (
            <TextField
              onClick={() => hashtags.length === 0 && dispatch(getHashtags())}
              {...params}
              label="#hashtag"
              placeholder="#"
              sx={{
                "& .MuiInputBase-input::placeholder": { color: "white" },
              }}
              InputLabelProps={{
                style: { color: `${theme.palette.primary.main}` },
              }}
            />
          )}
          PaperComponent={({ children }) => (
            <Paper
              sx={{
                backgroundColor: `${
                  theme.palette.mode === "dark" ? "black" : "primary"
                }`,
              }}
            >
              {children}
            </Paper>
          )}
        />
        <TypographyLength
          color={5 - selectedHashtags.length === 0 ? "red" : "gray"}
        >
          {5 - selectedHashtags.length}
        </TypographyLength>
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
      </Box>
    </form>
  );
};

export default NewPost;
NewPost.propTypes = {
  modalAction: PropTypes.object,
};