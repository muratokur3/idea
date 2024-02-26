import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardHeader, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHashtagsExplore } from "../../redux/actions/HashtagsAction";
import FollowHashtags from "../actions/FollowHashtags";

const HashtagCardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginedUser = useSelector((state) => state.authentication.user);
  const hashtagsExplore = useSelector(
    (state) => state.hashtags.hashtagsExplore
  );

  

  useEffect(() => {
    dispatch(getHashtagsExplore());
  }, []);

  return (
    <>
      {hashtagsExplore.map((hashtag, index) => (
        <div key={index} className="hashtag">
          <Card
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              maxHeight: "100%",
            }}
          >
            <CardHeader
              title={
                <Typography
                  gutterBottom
                  component="div"
                  onClick={() => navigate(`${hashtag.name}`)}
                >
                  {hashtag.name}
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
        </div>
      ))}
    </>
  );
};

export default HashtagCardList;
