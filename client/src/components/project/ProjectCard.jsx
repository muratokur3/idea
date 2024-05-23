import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Box, Button } from "@mui/material";
import TopRightButton from "../actions/TopRightButton";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import CreateOrUpdateProject from "./CreateOrUpdateProject";
import Modal from "../../Modals";
import { deleteProject } from "../../redux/actions/ProjectAction";
const webSiteUrl = import.meta.env.VITE_WEBSITE_BASE_URL;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProjectCard = ({ project }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
const dispatch=useDispatch();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const logginedUser = useSelector(
    (state) => state.session && state.session.user
  );
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const targetDate = new Date(timestamp);

    const timeDifference = now - targetDate;
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (days === 0) {
      if (hours === 0) {
        return `${minutes} dakika önce`;
      } else {
        return `${hours} saat önce`;
      }
    } else if (days === 1) {
      return "Dün";
    } else {
      // Eğer bir önceki günden daha önce ise sadece tarihi döndür
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return targetDate.toLocaleDateString("tr-TR", options);
    }
  };
  return (
    <Card
      sx={{
        width: "80%",
        maxWidth: "100%",
        background: `${theme.palette.postBackground.default} !important`,
        marginTop: "10px",
        borderRadius: "25px",
        border: "1px solid rgba(165, 157, 157, 0.529)",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={webSiteUrl + project?.logo}
            sx={{ border: ".1rem solid gray", width: "60px", height: "60px" }}
            aria-label="recipe"
          >
            LOGO
          </Avatar>
        }
        action={
          <TopRightButton
            actions={[
              project?.userId !== logginedUser?._id && (
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => navigate(`/${project?.username}`)}
                >
                  profili ziyaret et
                </Button>
              ),
              logginedUser && project?.userId === logginedUser?._id && (
                <Modal
                  buttonText={"Güncelle"}
                  component={<CreateOrUpdateProject project={project} />}
                />
              ),
              logginedUser && project?.userId === logginedUser?._id && (
                <Button
                  variant="text"
                  color="primary"
                  onClick={() =>dispatch(deleteProject(project?._id)) }
                >
                  Sil
                </Button>
              ),
            ]}
          />
        }
        title={
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography>{project?.name}</Typography>
            <Typography variant="caption" color="gray">
              {formatRelativeTime(project?.createdAt)}
            </Typography>
          </Box>
        }
        titleTypographyProps={{ color: "primary" }}
        subheader={
          <Typography color="secondary">{project?.createDate}</Typography>
        }
      />

      <CardContent>
        <Typography
          variant="body2"
          color="primary"
          padding="10px"
          onClick={() =>
            navigate(`/explore/project/${project?.username}/${project?._id}`)
          }
        >
          {project?.title}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton aria-label="projeAdress" href={project?.projectAdress}>
            <LinkIcon />
          </IconButton>
          <IconButton aria-label="githubAdress" href={project?.githubAdress}>
            <GitHubIcon />
          </IconButton>
          <IconButton
            aria-label="share"
            onClick={async () => {
              if (navigator.share) {
                navigator
                  .share({
                    title: "Şahane fikir", // İsteğe bağlı
                    text: "idea sitesinde çok güzel bir fikir buldum", // İsteğe bağlı
                    url: `${webSiteUrl}/explore/project/${project?.username}/${project?._id}`, // İsteğe bağlı
                  })
                  .catch((error) => console.log("Paylaşım hatası", error));
              } else {
                // navigator.share API'si desteklenmiyor
                console.log("Paylaşım API'si desteklenmiyor");
              }
            }}
          >
            <IosShareIcon />
          </IconButton>
        </Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
          <Typography fontSize={12} color="primary" padding="10px">
            detaylar
          </Typography>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{project?.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProjectCard;
ProjectCard.propTypes = {
  project: PropTypes.object,
};
