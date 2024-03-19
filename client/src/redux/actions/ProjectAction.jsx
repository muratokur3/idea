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

const createProject = (data, logo) => async (dispatch) => {
  try {
    const ubdateLogo = async () => {
      try {
        console.log("logo avatars güncelleniyor", logo, data?.name);

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
          console.log("Logo eklendi", response.data.filename);
          const newLogoUrl = `uploads/images/project-logo/${response.data.filename}`;
          return newLogoUrl;
        } else {
          throw new Error("Proje logo yüklenemedi");
        }
      } catch (error) {
        console.log("Proje logo yükleme hatası:", error.message);
      }
    };

    const newLogoUrl = logo ? await ubdateLogo() : data?.logo;

    const response = await axios.post(`projects`, {
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

// const deleteProject = (id) => {
//   return (dispatch) => {
//     dispatch({ type: "DELETE_PROJECT_REQUEST" });
//     axios
//       .delete(`http://localhost:3000/projects/${id}`)
//       .then((response) => {
//         dispatch({ type: "DELETE_PROJECT_SUCCESS", payload: id });
//       })
//       .catch((error) => {
//         dispatch({ type: "DELETE_PROJECT_FAILURE", payload: error });
//       });
//   };
// };

export { getProjects, createProject };
