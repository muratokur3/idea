import axios from "../../../axiosConfig";
import {
  createSingleProject,
  setProjects,
  updateSingleProject,
  deleteProfileProject
} from "../slices/ProjectSlice";

const getProjects = (pagination, username) => async (dispatch) => {
  try {
    const response = await axios.get(`quest/projects/${username}`, {
      params: {
        page: pagination.page,
      },
    });
    if (response.status === 200) {
      dispatch(setProjects(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const createProject = (data, modalAction) => async (dispatch) => {
  try {
    const response = await axios.post(`projects/createProject`, data);
    if (response.status === 201) {
      console.log(response.data)
      dispatch(createSingleProject(response.data));
      window.alert("Projeniz başarıyla oluşturuldu.");
      modalAction.handleClose();
    }
  } catch (error) {
    console.log(error);
  }
};

const updateProject = (data, modalAction) => async (dispatch) => {
  try {
    const response = await axios.put(`projects/updateProject`, data);
    if (response.status === 200) {
      dispatch(updateSingleProject(response.data));
      window.alert("Projeniz başarıyla güncellendi.");
      modalAction.handleClose();
    }
  } catch (error) {
    console.log(error);
  }
};

//id değerine göre proje silme
const deleteProject = (projectId) => async (dispatch) => {
  try {
    const response = await axios.delete(`projects/${projectId}`);
    if (response.status === 200) {
      console.log(response);
      dispatch(deleteProfileProject(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
