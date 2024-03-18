import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useState } from "react";
import { Box, Button, Paper, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../redux/actions/ProjectAction";
import { useTheme } from "@mui/material/styles";
import { getHashtags } from "../../redux/actions/HashtagsAction";
import styled from "@emotion/styled";

const NewProject = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1234px)");

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [githubAdress, setGithubAdress] = useState("");
  const [projectAdress, setProjectAdress] = useState("");
  const [projectName, setProjectName] = useState("");
  const [createDate, setCreateDate] = useState("");
  const hashtags = useSelector((state) => state.hashtags.hashtags);
  const user = useSelector((state) => state.session && state.session.user);

  const inputControl = () => {
    const regex = /^[a-z0-9._]{3,20}$/;
    return (
      regex.test(projectName) &&
      regex.test(createDate) &&
      (projectAdress.length === 0 || regex.test(projectAdress)) &&
      (githubAdress.length === 0 || regex.test(githubAdress))&&
      (selectedHashtags.length > 0&&selectedHashtags.length < 6)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputControl())
    {
    const newProjectData = {
      userId: user._id,
      name: projectName,
      title: title,
      content,
      githubAdress,
      projectAdress,
      createDate,
      logo: "https://picsum.photos/200/300?random=1",
      hashtags: selectedHashtags.map((hashtag) => hashtag._id),
    };
    dispatch(createProject(newProjectData));
    setContent("");
    setTitle("");
    setProjectAdress("");
    setGithubAdress("");
    setProjectName("");
    setCreateDate("");
    setSelectedHashtags([]);
  }
  else{
    alert("Lütfen tüm alanları doldurduğunuzdan emin olun.");
  }
  };

  const TypographyLength = styled(Typography)({
    fontSize: "1rem",
    textAlign: "end",
  });

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: isMobile ? "100%" : "80%",
        paddingTop: isMobile ? "200px" : "0",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Avatar
        alt="Proje icon"
        src={user.avatar}
        sx={{
          width: "10vh",
          height: "10vh",
          maxHeight: "200px",
          maxWidth: "200px",
        }}
      />
      <TextField
        onChange={(e) => {
          setProjectName(e.target.value);
        }}
        value={projectName}
        className="adress"
        id="outlined-basic"
        label="Projenin Adı"
        variant="outlined"
        placeholder="ideacom..."
        required
      />
      <TextField
        onChange={(e) => {
          setProjectAdress(e.target.value);
        }}
        value={projectAdress}
        className="adress"
        id="outlined-basic"
        label="Projenin adresi"
        variant="outlined"
        placeholder="hhtps://"
      />
      <TextField
        onChange={(e) => {
          setGithubAdress(e.target.value);
        }}
        value={githubAdress}
        id="outlined-basic"
        label="Github Adresi"
        variant="outlined"
        placeholder="hhtps://"
      />
      <TextField
        onChange={(e) => {
          setCreateDate(e.target.value);
        }}
        value={createDate}
        maxLength={3}
        id="outlined-basic"
        label="Projenin oluşturma tarihi"
        variant="outlined"
        placeholder="1 Aralık 2021..."
        required
      />
      <Box>
        <TextareaAutosize
          className="title-textarea"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          minRows={3}
          maxLength={100}
          placeholder="Projeyi anlatan kısa başlık"
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: isMobile ? "1rem" : "1.1rem",
            maxHeight: "10vh",
            padding: "5px",
            resize: "none",
            lineHeight: "1.5",
            borderBottom: ".2rem solid rgba(107, 103, 103, 0.171)",
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
        <TypographyLength color={100 - title.length === 0 ? "red" : "gray"}>
          {100 - title.length}
        </TypographyLength>

        <TextareaAutosize
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          minRows={3}
          maxLength={1000}
          placeholder="projeyi detaylandırın..."
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: isMobile ? ".8rem" : "1.1rem",
            maxHeight: "15vh",
            resize: "none",
            lineHeight: "1.5",
            overflow: "hidden",
            borderBottom: ".2rem solid rgba(107, 103, 103, 0.171)",
            "&::placeholder": {
              fontSize: "1rem",
            },
            fontFamily: "monospace",
            background: "none", // Arka plan rengini kaldır
            color: `${theme.palette.primary.main}`,
          }}
          required
        />
        <TypographyLength color={1000 - content.length === 0 ? "red" : "gray"}>
          {1000 - content.length}
        </TypographyLength>
      </Box>
      <Autocomplete
        onChange={(e, value) => {
          value.length < 6 && setSelectedHashtags(value);
        }}
        className="new-post-hashtag"
        value={selectedHashtags}
        multiple
        size={isMobile ? "small" : "medium"}
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
        variant="outlined"
        color="primary"
        sx={{
          width: "50%",
          borderRadius: "60px",
          margin: "0 auto",
        }}
      >
        Ekle
      </Button>
    </form>
  );
};

export default NewProject;
