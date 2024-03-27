import InfinieScroll from "react-infinite-scroll-component";
import UserSkeleton from "../skeleton/UserSkeleton.jsx";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import UserCard from "./UserCard.jsx";

const ListPost = ({ data,getUsers }) => {
  return (
    <InfinieScroll
      dataLength={data?.users?.length}
      next={()=>getUsers()}
      hasMore={data?.pagination?.hasMore}
      loader={<UserSkeleton />}
      endMessage={<Typography color="primary" sx={{textAlign:"center", fontSize:".8rem",marginTop:"20px",}}>{data?.users?.length} öğe</Typography>}
    >
     { data?.users.map((user,index) => (
        <UserCard key={index} user={user} />
      ))}
    </InfinieScroll>
  );
};

export default ListPost;
ListPost.propTypes = {
  data: PropTypes.object,
  getUsers: PropTypes.func,
};
