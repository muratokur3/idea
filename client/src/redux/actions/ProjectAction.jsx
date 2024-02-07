import axios from "axios";
import { setNewProject } from "../slices/ProjectSlice";


const apiUrl = import.meta.env.VITE_API_BASE_URL;


const getProjects = () => {
    return (dispatch) => {
        dispatch({ type: 'GET_PROJECTS_REQUEST' });
        axios.get('http://localhost:3000/projects')
            .then((response) => {
                dispatch({ type: 'GET_PROJECTS_SUCCESS', payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: 'GET_PROJECTS_FAILURE', payload: error });
            });
    };
}

const createProject = (data) => async (dispatch) => {
   try {
    const response = await axios.post(`${apiUrl}/api/projects`,data,{
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.status === 200) {
        console.log(response.data);
        dispatch(setNewProject(response.data));
      }
   } catch (error) {
    console.log(error);
   }
}

const deleteProject = (id) => {
    return (dispatch) => {
        dispatch({ type: 'DELETE_PROJECT_REQUEST' });
        axios.delete(`http://localhost:3000/projects/${id}`)
            .then((response) => {
                dispatch({ type: 'DELETE_PROJECT_SUCCESS', payload: id });
            })
            .catch((error) => {
                dispatch({ type: 'DELETE_PROJECT_FAILURE', payload: error });
            });
    };
}

export { getProjects, createProject, deleteProject };