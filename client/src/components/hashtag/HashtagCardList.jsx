import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { setFilterExplore } from "../../redux/slices/FilterSlice";
import { useNavigate } from "react-router-dom";
import { getHashtagsExplore } from "../../redux/actions/HashtagsAction";

const HashtagCardList = () => {
  const dispatch = useDispatch();
  const hashtagsExplore = useSelector(
    (state) => state.hashtags.hashtagsExplore
  );
  const filterExplore = useSelector((state) => state.filterPosts.filterExplore);
  const profileData = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setFilterExplore(""));
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
            onClick={() => navigate(`${hashtag.name}`)}
          >
            <CardHeader
              title={
                <Typography gutterBottom component="div">
                  {hashtag.name}
                </Typography>
              }
              subheader={
                <Typography color="gray">{hashtag.postCount}</Typography>
              }
              action={
                !new Set(profileData.user.hashtags).has(hashtag.name) && (
                  <Button
                    className="follow-button"
                    variant="contained"
                    size="small"
                  >
                    Takip
                  </Button>
                )
              }
            ></CardHeader>
          </Card>
        </div>
      ))}
    </>
  );
};

export default HashtagCardList;
