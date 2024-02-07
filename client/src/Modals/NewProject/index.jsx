import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useState } from "react";
import { setNewPostPage, setNewProjectPage } from "../../redux/slices/UiSlice";
import { Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./new-project-page.scss";
import { createProject } from "../../redux/actions/ProjectAction";

const NewProjectPage = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [githubAdress, setGithubAdress] = useState("");
  const [projectAdress, setProjectAdress] = useState("");
  const hashtags = useSelector((state) => state.hashtags.hashtags);
  const user = useSelector((state) => state.authentication.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      userId: user.id,
      title: title,
      content,
      githubAdress,
      projectAdress,
      hashtags: selectedHashtags.map((hashtag) => hashtag._id),
    };
    dispatch(createProject(newProject));
    setContent("");
    setTitle("");
    setProjectAdress("");
    setGithubAdress("");
    setSelectedHashtags([]);
    dispatch(setNewPostPage(false));
  };

  return (
    <div id="new-project-page">
      <div
        id="modal-overlay"
        onClick={() => dispatch(setNewProjectPage(false))}
      ></div>
      <div id="box-new-project">
        <Avatar
          alt="Remy Sharp"
          src={user.avatar}
          sx={{ width: 80, height: 80 }}
        />
        <form onSubmit={handleSubmit} id="new-project-form">
          <p
            style={{
              color: "rgba(105, 102, 102, 0.697)",
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            {175 - title.length}
          </p>

          <TextareaAutosize
            className="title-textarea"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            minRows={3}
            maxRows={3}
            maxLength={175}
            placeholder="Proje adı veya başlığı"
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
            placeholder="Proje detayları"
            sx={{
              marginBottom: "20px",
              fontFamily: "monospace",
              fontSize: ".9rem",
            }}
            required
          />
          <p
            style={{
              color: "rgba(105, 102, 102, 0.697)",
              position: "absolute",
              top: "33%",
              right: 0,
            }}
          >
            {1500 - content.length}
          </p>
          <TextField
          onChange={(e) => {setProjectAdress(e.target.value)}}
            className="adress"
            sx={{
              "& .MuiInputBase-input::placeholder": { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
            inputProps={{
              style: { color: "white" }, // input öğesinin yazı rengini beyaz yapar
            }}
            id="outlined-basic"
            label="Projenin adresi"
            variant="outlined"
            placeholder="hhtps://"
          />
          <TextField
          onChange={(e) => {setGithubAdress(e.target.value)}}
            className="adress"
            sx={{
              "& .MuiInputBase-input::placeholder": { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
            inputProps={{
              style: { color: "white" }, // input öğesinin yazı rengini beyaz yapar
            }}
            id="outlined-basic"
            label="Github Adresi"
            variant="outlined"
            placeholder="hhtps://"
          />

          <Autocomplete
            onChange={(e, value) => {
              setSelectedHashtags(value);
            }}
            className="new-project-hashtag"
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

          <div className="new-project-media">
            <div className="new-project-media-icons">
              <AddPhotoAlternateIcon sx={{ fontSize: 30 }} />
            </div>
            <Button type="submit" id="new-project-submit" variant="outlined">
              Ekle
            </Button>
          </div>
        </form>

        <Button
          className="close-new-project-page"
          onClick={() => dispatch(setNewProjectPage(false))}
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default NewProjectPage;
