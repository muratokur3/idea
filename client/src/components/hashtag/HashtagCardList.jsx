import { useDispatch, useSelector } from "react-redux";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { setFilterExplore } from "../../redux/slices/FilterSlice";
import { useNavigate } from "react-router-dom";
import { getHashtagsExplore } from "../../redux/actions/HashtagsAction";

const HashtagCardList = () => {
  const dispatch = useDispatch();
  const hashtagsExplore = useSelector((state) => state.hashtags.hashtagsExplore);
  const filterExplore = useSelector((state) => state.filterPosts.filterExplore);
  const navigate=useNavigate();

  useEffect(() => { 
   dispatch(setFilterExplore(""));
   dispatch(getHashtagsExplore());
  }, []);

  return (
    <>
      {hashtagsExplore
        .map((hashtag, index) => (
          <div key={index} className="hashtag" >
            <Card
              sx={{
                backgroundColor: "transparent",
                width: "100%",
                maxHeight: "100%",
              }}
              onClick={()=>navigate(`${hashtag.name}`)}
            >
              <CardActionArea >
                <CardContent>
                  <Typography gutterBottom component="div">

                    {hashtag.name}
                  </Typography>
                  <Typography variant="body2" color="gray" >
                    {hashtag.postCount}{filterExplore}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
    </>
  );
};

export default HashtagCardList;
