import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useState } from "react";
import { Box, Button, Paper, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../redux/actions/ProjectAction";
import { useTheme } from "@mui/material/styles";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProjectData = {
      userId: user.id,
      name: projectName,
      title: title,
      content,
      githubAdress,
      projectAdress,
      createDate,
      logo:"https://picsum.photos/200/300?random=1",
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
  };

  return (
   
        <form onSubmit={handleSubmit}
        style={{
          width: isMobile?"100%": "80%",
          paddingTop:isMobile ?"200px":"0",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        
        }}>
           <Avatar
          alt="Proje icon"
          src={user.avatar}
          sx={{ width: "10vh", height: "10vh", maxHeight: "200px", maxWidth: "200px"}}
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
            id="outlined-basic"
            label="Projenin oluşturma tarihi"
            variant="outlined"
            placeholder="1 Aralık 2021..."
          />

          <TextareaAutosize
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            minRows={3}
            maxRows={3}
            maxLength={175}
            placeholder="Proje kısa açıklaması"
            
           style={{
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
            minRows={5}
            maxLength={1500}
            placeholder="Proje detayları"
            style={{
              background: "none",
              color: `${theme.palette.primary.main}`,
              
             }}
            required
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
                  "& .MuiInputBase-input::placeholder": { color: "primary" },
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

          <Box>
           
            <Button type="submit" variant="outlined"
            color="primary"
            sx={{
              width: "90%",
              height: "40px",
              borderRadius: "60px",
              borderColor: "gray",
              "&:hover": {
                borderColor: "white",
              },

            }}>
              Ekle
            </Button>
          </Box>
        </form>
  );
};

export default NewProject;
