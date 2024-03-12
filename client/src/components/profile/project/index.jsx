import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProjects } from '../../../redux/actions/ProjectAction'
import InfinieScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ProjectSkeleton from '../../skeleton/ProjectSkeleton'
import NewProjectModal from "../../../Modals/NewProjectModal";
import { Box } from "@mui/material";

const Project = () => {
  const projectData = useSelector((state) => state.project);
  const activeUser = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const { username } = useParams();

  useEffect(() => {
      dispatch(getProjects({ page: 1, hasMore: true }, username));
  }, [username, dispatch],);

  return (
    <Box sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",

    }}>
     {username === activeUser?.username && (
     <NewProjectModal />
      )}
      {projectData.projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
      <InfinieScroll
        dataLength={projectData.projects.length}
        next={() => dispatch(getProjects({ page: projectData.pagination.page},username ))}
        hasMore={projectData.pagination.hasMore}
        loader={<ProjectSkeleton />}
        endMessage={
          <p style={{ textAlign: "center", fontSize: ".8rem" }}>
            {projectData.projects.length} öğe
          </p>
        }
      ></InfinieScroll>
    </Box>
  );
};

export default Project;
