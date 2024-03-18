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
import { Box, Button } from "@mui/material";
import ActionsButton from "../../Modals/ActionsButton";
import { useNavigate } from "react-router-dom";
import {useTheme} from "@mui/material/styles";
const webSiteUrl=import.meta.env.VITE_WEBSITE_BASE_URL;

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
  const theme=useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
            src={project?.logo}
            sx={{ bgcolor: red[500], width:"60px", height:"60px" }}
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        action={
          <ActionsButton actions={[
             { label: "Bildir", onClick: () => {alert("Bildir")} },
              {label:"profili ziyaret et", onClick:()=>navigate(`/${project?.username}`)},
           ]} />
         }
        title={project?.name}
        titleTypographyProps={{ color: "primary",}}
        subheader={
            <Typography
            color="secondary"
          >
            {project?.createDate}
          </Typography>
         
        }
      />

      <CardContent>
        <Typography variant="body2" color="primary" padding="10px"
         onClick={() => navigate(`/explore/project/${project?.username}/${project?._id}`)}
        >
          {project?.title}
        </Typography>
        {project?.hashtagsName?.map((hashtag) => (
             <Button
             variant="outlined"
             size="small"
               key={hashtag}
               sx={{
                 textDecoration: "none",
                 display: "inline-block",
                 marginRight: "10px",
                 color: `${theme.palette.primary.main}`,
                 border: `.5px solid grey`,
                 borderRadius: "10px",
                 cursor: "pointer",
               }}
              //  onClick={()=>navigate(`/explore/${hashtag}`)}
             >
               {hashtag}
             </Button>
        ))}
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
          <IosShareIcon
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
            />
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
        <CardContent style={{ backgroundColor: "gray" }}>
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
