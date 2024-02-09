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
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import IosShareIcon from "@mui/icons-material/IosShare";
import { Box } from "@mui/material";
import ActionsButton from "../../../Modals/ActionsButton";

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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
// const LoginUserId = localStorage.getItem("userId");
  return (
    <Card
      sx={{
        width: "70%",
        maxWidth: "100%",
        backgroundColor: "rgba(13, 13, 13, 0.63)",
        marginTop: "10px",
        borderRadius: "25px",
        border: "1px solid rgba(165, 157, 157, 0.529)",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={project.logo}
            sx={{ bgcolor: red[500], width:"60px", height:"60px" }}
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        action={
          <ActionsButton actions={[
             { label: "Bildir", onClick: () => {alert("Bildir")} },

           ]} />
         }
        title={project.name}
        titleTypographyProps={{ color: "white", fontSize: "1.2rem" }}
        subheader={
          <Typography
            sx={{ fontSize: "0.8rem", color: "gray", cursor: "pointer" }}
          >
            {project.createDate}
          </Typography>
        }
        subheaderTypographyProps={{ color: "gray" }}
      />

      <CardContent>
        <Typography variant="body2" color="white" padding="10px">
          {project.title}
        </Typography>
        {/* {project.hashtagsName.map((hashtag) => (
          <Link
            key={hashtag}
            variant="body3"
            style={{
              textDecoration: "none",
              fontSize: ".8rem",
              display: "inline-block",
              marginRight: "10px",
              color: "black",
              backgroundColor: "gray",
              borderRadius: "10px",
              padding: "5px",
              cursor: "pointer",
            }}
            to={`/explore/${hashtag}`}
          >
            {hashtag}
          </Link>
        ))} */}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton aria-label="projeAdress">
            <LinkIcon />
          </IconButton>
          <IconButton aria-label="githubAdress">
            <GitHubIcon />
          </IconButton>
          <IconButton aria-label="share">
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
          <Typography fontSize={12} color="white" padding="10px">
            detaylar
          </Typography>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ backgroundColor: "gray" }}>
          <Typography paragraph>{project.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProjectCard;
ProjectCard.PropTypes = {
  project: PropTypes.object,
};
