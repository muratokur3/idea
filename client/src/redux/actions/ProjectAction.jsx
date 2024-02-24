import axios from "axios";
import { setNewProject, setProjects } from "../slices/ProjectSlice";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const getProjects = (pagination, username) => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/api/quest/projects/${username}`, {
      params: {
        page: pagination.page,
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (response.status === 200 ) {
      dispatch(setProjects(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const createProject = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/api/projects`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
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
