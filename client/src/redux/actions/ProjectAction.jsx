import axios from "../../../axiosConfig";
import { deleteProfileProject, setNewProject, setProjects, updateSingleProject } from "../slices/ProjectSlice";

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

const updateLogo = async (data, logo) => {
  try {
    const formData = new FormData();
    const logoData = await logo; // Promise'in çözülmesini bekleyin
    formData.append("file", logoData);

    const response = await axios.post(
      `users/upload/images?filename=${data?._id}&folder=project-logo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      console.log(`uploads/images/project-logo/${response.data.filename}`);
      const logourl = `uploads/images/project-logo/${response.data.filename}`;
      const ubdataResponse = await axios.put(`projects/updateProject`, {
        ...data,
        logo: logourl,
      });
      if (ubdataResponse.status === 200) {
        return ubdataResponse.data;
      }
    }
  } catch (error) {
    console.log("Proje logo yükleme hatası:", error.message);
  }
};

const updateProject = (data, logo) => async (dispatch) => {
  try {
    if (logo) {
      console.log(data)
      const newdata = await updateLogo(data, logo);
      dispatch(setNewProject(newdata));
    } else {
      const response = await axios.put(`projects/updateProject`, data);
      if (response.status === 200) {
        dispatch(updateSingleProject(response.data));
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const createProject = (data, logo) => async (dispatch) => {
  try {
    const response = await axios.post(`projects/createProject`, data);

    if (response.status === 201) {
      if (logo) {
        const newdata = await updateLogo(response.data, logo);
        dispatch(setNewProject(newdata));
      } else {
        dispatch(setNewProject(response.data));
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//id değerine göre proje silme
const deleteProject =  (projectId) => async(dispatch)=> {
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

export { getProjects, createProject, updateProject, deleteProject };
