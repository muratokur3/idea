import { Button } from "@mui/material";
import ProjectCard from "./ProjectCard";
import "./scss/project.scss";
import { useDispatch, useSelector } from "react-redux";
import { setNewProjectPage } from "../../redux/slices/UiSlice";
import { useEffect } from "react";
import { getProjects } from "../../redux/actions/ProjectAction";
import InfinieScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ProjectSkeleton from "../skeleton/ProjectSkeleton";

const Project = () => {
  const projectData = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { username } = useParams();

  useEffect(() => {
    projectData.projects.length === 0 &&
      dispatch(getProjects({ page: 1, hasMore: true }, username));
  }, []);

  return (
    <div id="project-container">
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => dispatch(setNewProjectPage(true))}
      >
        Yeni Proje
      </Button>
      {projectData.projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
      <InfinieScroll
        dataLength={projectData.projects}
        next={() => dispatch(getProjects({ page: projectData.pagination.page},username ))}
        hasMore={projectData.pagination.hasMore}
        loader={<ProjectSkeleton />}
        endMessage={
          <p style={{ textAlign: "center", fontSize: ".8rem" }}>
            {projectData.projects.length} öğe listelendi. Gösterilecek başka
            proje yok
          </p>
        }
      ></InfinieScroll>
    </div>
  );
};

export default Project;
