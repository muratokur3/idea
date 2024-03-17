import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardHeader, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHashtagsExplore } from "../../redux/actions/HashtagsAction";
import FollowHashtags from "../actions/FollowHashtags";

const HashtagCardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginedUser = useSelector((state) => state.session && state.session.user);
  const hashtagsExplore = useSelector(
    (state) => state.hashtags.hashtagsExplore
  );

  

  useEffect(() => {
    dispatch(getHashtagsExplore());
  }, []);

  return (
    <>
      {hashtagsExplore.map((hashtag, index) => (
        <Box key={index}>
          <Card
            sx={{
              backgroundColor: "transparent",
              width: "100%",
            }}
          >
            <CardHeader
            sx={{
              "&:hover": {
                backgroundColor: "rgba(186, 181, 181, 0.324)",
              },

            }}
              title={
                <Typography
                  gutterBottom
                  component="div"
                  color="primary"
                  sx={{ fontSize: "1.2rem", 
                  letterSpacing: "1px",
                  }}
                  onClick={() => navigate(`${hashtag.name}`)}
                >
                  #{hashtag.name}
                </Typography>
              }
              subheader={
                <Typography
                  color="gray"
                  onClick={() => navigate(`${hashtag.name}`)}
                >
                  {hashtag.postCount}
                </Typography>
              }
              action={
                loginedUser._id && <FollowHashtags hashtagName={hashtag.name} />

                
              }
            ></CardHeader>
          </Card>
        </Box>
      ))}
    </>
  );
};

export default HashtagCardList;
