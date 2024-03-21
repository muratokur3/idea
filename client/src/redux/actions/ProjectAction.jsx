import axios from "../../../axiosConfig";
import { setNewProject, setProjects } from "../slices/ProjectSlice";

const getProjects = (pagination, username) => async (dispatch) => {
  try {
    const response = await axios.get(`quest/projects/${username}`, {
      params: {
        page: pagination.page,
      },
    });
    if (response.status === 200) {
      console.log(response.data);
      dispatch(setProjects(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};
const ubdateLogo = async (data, logo) => {
  try {
    const formData = new FormData();
    const logoData = await logo; // Promise'in çözülmesini bekleyin
    formData.append("file", logoData);

    const response = await axios.post(
      `users/upload/images?username=${data?.name}&folder=project-logo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      return `uploads/images/project-logo/${response.data.filename}`;
    }
  } catch (error) {
    console.log("Proje logo yükleme hatası:", error.message);
  }
};

const ubdateProject = (data, logo) => async (dispatch) => {
  try {
    const newLogoUrl = logo ? await ubdateLogo(data, logo) : data?.logo;
    const response = await axios.put(`projects/ubdateProject`, {
      ...data,
      logo: newLogoUrl,
    });

    if (response.status === 200) {
      dispatch(setNewProject(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const createProject = (data, logo) => async (dispatch) => {
  try {
    const newLogoUrl = logo ? await ubdateLogo(data, logo) : data?.logo;

    const response = await axios.post(`projects/createProject`, {
      ...data,
      logo: newLogoUrl,
    });

    if (response.status === 200) {
      dispatch(setNewProject(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

//id değerine göre proje silme
const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`projects/${projectId}`);
    if (response.status === 200) {
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export { getProjects, createProject, ubdateProject, deleteProject };
