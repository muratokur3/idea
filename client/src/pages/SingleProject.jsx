import axios from '../../axiosConfig';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "../components/project/ProjectCard";

const SingleProject = () => {
  
  const [project, setProject] = useState();
  const { username, id } = useParams();
  const getProject = async () => {
    const response = await axios.get(
      `quest/explore/singleproject/${id}`
    );
    setProject(response.data[0]);
  };

  useEffect(() => {
    getProject();
  }, [username, id]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {project ? (
        <ProjectCard project={project} />
      ) : (
        <div>Project not found</div>
      )}
    </div>
  );
};

export default SingleProject;
