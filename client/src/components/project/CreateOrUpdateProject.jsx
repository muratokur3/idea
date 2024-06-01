import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useState } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import {
  createProject,
  updateProject,
} from "../../redux/actions/ProjectAction";
const CreateOrUpdateProject = ({ project, modalAction }) => {
  const theme = useTheme();
  const isPhone = useMediaQuery("(max-width: 600px)");

  const dispatch = useDispatch();

  const logginedUser = useSelector(
    (state) => state.session && state.session.user
  );
  const [formData, setFormData] = useState(
    project
      ? { ...project }
      : {
          name: "",
          title: "",
          content: "",
          githubAdress: "",
          projectAdress: "",
          createDate: "",
          userId: logginedUser._id,
        }
  );

  const handleInputChance = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputControl = () => {
    const regex = /^.{3,20}$/;
    return (
      regex.test(formData.name) &&
      regex.test(formData.createDate) &&
      (formData.projectAdress.length === 0 ||
        regex.test(formData.projectAdress)) &&
      (formData.githubAdress.length === 0 || regex.test(formData.githubAdress))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputControl()) {
      project
        ? dispatch(
            updateProject(
              {
                _id: project._id,
                name: formData.name,
                title: formData.title,
                content: formData.content,
                githubAdress: formData.githubAdress,
                projectAdress: formData.projectAdress,
                createDate: formData.createDate,
                userId: formData.userId,
              },
              modalAction
            )
          )
        : dispatch(createProject(formData, modalAction));
    } else {
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
        width: isPhone ? "100%" : "80%",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <TextField
        onChange={handleInputChance}
        value={formData.name}
        name="name"
        className="adress"
        id="outlined-basic"
        label="Projenin Adı"
        variant="outlined"
        placeholder="ideacom..."
        required
      />
      <TextField
        onChange={handleInputChance}
        value={formData.projectAdress}
        name="projectAdress"
        className="adress"
        id="outlined-basic"
        label="Projenin adresi"
        variant="outlined"
        placeholder="hhtps://"
      />
      <TextField
        onChange={handleInputChance}
        value={formData.githubAdress}
        name="githubAdress"
        id="outlined-basic"
        label="Github Adresi"
        variant="outlined"
        placeholder="hhtps://"
      />
      <TextField
        onChange={handleInputChance}
        value={formData.createDate}
        name="createDate"
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
          onChange={handleInputChance}
          value={formData.title}
          name="title"
          minRows={3}
          maxLength={100}
          placeholder="Projeyi anlatan kısa başlık"
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: isPhone ? "1rem" : "1.1rem",
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
        <TypographyLength
          color={100 - formData.title.length === 0 ? "red" : "gray"}
        >
          {100 - formData.title.length}
        </TypographyLength>

        <TextareaAutosize
          onChange={handleInputChance}
          value={formData.content}
          name="content"
          minRows={3}
          maxLength={1000}
          placeholder="projeyi detaylandırın..."
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: isPhone ? ".8rem" : "1.1rem",
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
        <TypographyLength
          color={1000 - formData.content.length === 0 ? "red" : "gray"}
        >
          {1000 - formData.content.length}
        </TypographyLength>
      </Box>

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
        {project ? "Güncelle" : "Oluştur"}
      </Button>
    </form>
  );
};

export default CreateOrUpdateProject;
CreateOrUpdateProject.propTypes = {
  project: PropTypes.object,
  modalAction: PropTypes.func,
};
