import ListPost from "../components/post/ListPost";
import CreateOrUpdatePost from "../components/post/CreateOrUpdatePost";
import { useDispatch, useSelector } from "react-redux";

import {
  getHomeData,
  getHomeQuestData,
  getPrivateMeData,
} from "../redux/actions/PostActions";
import { useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import HomeTabs from "../components/actions/HomeTabs";

const Home = () => {
  const dispatch = useDispatch();
  const isPhone = useMediaQuery("(max-width: 600px)");
  const isLoggedIn = useSelector(
    (state) => state.session && state.session.authenticated
  );

  const filterName = useSelector((state) => state.filterPosts.filterName);
  const homeData = useSelector((state) => state.posts.home);
  const privateMeData = useSelector((state) => state.posts.privateMe);

  useEffect(() => {
    homeData.posts.length === 0 &&
      (isLoggedIn
        ? dispatch(getHomeData(homeData.pagination))
        : dispatch(getHomeQuestData(homeData.pagination)));

    filterName !== "all" &&
      privateMeData.posts.length === 0 &&
      dispatch(getPrivateMeData(privateMeData.pagination));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box   sx={{
      width: "100%",
      maxWidth: "100%",}}>
      {(isLoggedIn || isPhone) && <HomeTabs />}
      
      {isLoggedIn && filterName === "all" && <CreateOrUpdatePost />}

      {filterName === "all" && (
        <Box>
          {!isLoggedIn&&<Box
          sx={{
            width:"100%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            gap:"1rem",
            padding:"2rem",

          }}>
            <Typography color={"primary"} sx={{
              fontSize:"2rem",
              fontWeight:"bold",
            }}>Aramıza Hoşgeldiniz</Typography>
             <Typography color={"primary"} sx={{
              fontSize:"1.5rem",
            }}>Umarız ilham alır ilham olursunuz</Typography>
             <Typography color={"primary"} sx={{
              fontSize:"1rem",
            }}>En beğendiğiniz fikir sahiplerini ve konu başlıklarını takip edin</Typography>
            
            </Box>}
          <ListPost
            data={homeData}
            getPosts={() =>
              dispatch(
                isLoggedIn
                  ? getHomeData(homeData.pagination)
                  : getHomeQuestData(homeData.pagination)
              )
            }
          />
          </Box>
      )}
      {filterName !== "all" && (
        <ListPost
          data={privateMeData}
          getPosts={() =>
            dispatch(getPrivateMeData(privateMeData.pagination))
          }
        />
      )}
    </Box>
  );
};

export default Home;
