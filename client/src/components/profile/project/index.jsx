import { Button } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { setNewProjectPage } from '../../../redux/slices/UiSlice'
import { useEffect } from "react";
import { getProjects } from '../../../redux/actions/ProjectAction'
import InfinieScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ProjectSkeleton from '../../skeleton/ProjectSkeleton'
import "./project.scss";

const Project = () => {
  const projectData = useSelector((state) => state.project);
  const activeUser = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const { username } = useParams();

  useEffect(() => {
      dispatch(getProjects({ page: 1, hasMore: true }, username));
  }, [username, dispatch],);

  return (
    <div id="project-container">
     {username === activeUser?.username && (
        <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => dispatch(setNewProjectPage(true))}
      >
        Yeni Proje Ekle
      </Button>
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
    </div>
  );
};

export default Project;
