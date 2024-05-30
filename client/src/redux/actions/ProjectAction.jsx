import axios from "../../../axiosConfig";
import {
  setNewPofileProject,
  updateProfileProject,
} from "../slices/ProfileSlice";
import {
  deleteProfileProject,
  setNewProject,
  setProjects,
  updateSingleProject,
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

const updateProjectLogo = (data, logo) => async (dispatch) => {
  try {
    const formData = new FormData();
    const logoData = await logo; // Promise'in çözülmesini bekleyin
    formData.append("file", logoData);

    const response = await axios.post(
      `users/upload/images?filename=${data?._id}&folder=logos`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      const updateResponse = await axios.put(`projects/updateProject`, {
        ...data,
        logo: response.data.adress,
      });
      if (updateResponse.status === 200) {
        dispatch(updateSingleProject(updateResponse.data));
        return updateResponse.data;
      }
    }
  } catch (error) {
    console.log("Proje logo yükleme hatası:", error.message);
  }
};

const updateProject = (data, modalAction) => async (dispatch) => {
  try {
    const response = await axios.put(`projects/updateProject`, data);
    if (response.status === 200) {
      dispatch(updateSingleProject(response.data));
      dispatch(updateProfileProject(response.data));
      window.alert("Projeniz başarıyla güncellendi.");
      modalAction.handleClose();
    }
  } catch (error) {
    console.log(error);
  }
};

const createProject = (data, logo, modalAction) => async (dispatch) => {
  try {
    const response = await axios.post(`projects/createProject`, data);

    if (response.status === 201) {
      if (logo) {
        dispatch(updateProjectLogo(response.data, logo));

        dispatch(setNewPofileProject(response.data));
        dispatch(setNewProject(response.data));
        window.alert("Projeniz başarıyla oluşturuldu.");
        modalAction.handleClose();
      } else {
        dispatch(setNewPofileProject(response.data));
        dispatch(setNewProject(response.data));
      }
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
  updateProjectLogo,
};
