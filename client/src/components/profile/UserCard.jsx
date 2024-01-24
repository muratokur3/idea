import { Avatar, Button, CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserCard = ({ user }) => {
  return (
    <Card sx={{ maxWidth: "100%", backgroundColor: "rgba(10, 9, 9, 0.713)", marginTop:"10px"}}>
      <CardHeader
        avatar={
          <Avatar src={user.avatar} sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
            <Button sx={{color:"white"}}>Takip Et</Button>
          </IconButton>
        }
        title={`${user.name} ${user.surname}`}
        titleTypographyProps={{ fontSize: "1rem" }}
        subheader={`@${user.username}`}
        subheaderTypographyProps={{ fontSize: "0.8rem", color: "gray" }}
        
      />
      <CardContent
        sx={{
          color:"white",
          fontSize: "0.7rem",
          padding: "10px",
        }}
      >
        {user.bio}
      </CardContent>
      <CardActions ></CardActions>
    </Card>
  );
};

export default UserCard;
