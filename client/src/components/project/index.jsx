import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProjects } from '../../redux/actions/ProjectAction'
import InfinieScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ProjectSkeleton from '../skeleton/ProjectSkeleton'
import { Box, Typography } from "@mui/material";
import Modal from "../../Modals";
import CreateOrUpdateProject from "./CreateOrUpdateProject";

const Project = () => {
  const projectData = useSelector((state) => state.project);
  const activeUser = useSelector((state) => state.session && state.session.user);
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
     <Modal
     buttonText="Yeni proje Ekle"
     component={<CreateOrUpdateProject/>}
   />
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
          <Typography sx={{ textAlign: "center", fontSize: ".8rem", color:"primary.main"}}>
            {projectData.projects.length} öğe
          </Typography>
        }
      ></InfinieScroll>
    </Box>
  );
};

export default Project;
