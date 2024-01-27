import { Avatar, Button, CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { followUser } from "../../redux/actions/ProfileAction";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserCard = ({ user }) => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const activeUserId = localStorage.getItem("userId");
  const activeUser=JSON.parse(localStorage.getItem("user"));
  const [isFollowed, setIsFollowed] = useState(false);
  const isFollow =async () => {
  
      activeUser &&
      user &&
     setIsFollowed(user.followers.some((u) => u === activeUser.id )) 
  };

  useEffect(() => {
    isFollow();
  }, [user]
  );
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
            {activeUser && activeUser.id !== user._id && (
           <Button
           className="follow-button"
           variant="contained"
          
           onClick={() => dispatch(followUser(activeUserId, user._id))}
         >
           {isFollowed ? "Takibi Bırak" : "Takip Et"}
         </Button>)}
          </IconButton>
        }
        title={`${user.name} ${user.surname}`}
        titleTypographyProps={{ fontSize: "1rem" }}
        subheader={<Typography onClick={()=>navigate(`/${user.username}`)}
        sx={{ fontSize: "0.8rem", color: "gray",cursor:"pointer" }}>
          @{user.username}
        </Typography>}
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

