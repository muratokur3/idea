import { useDispatch, useSelector } from "react-redux";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { getHashtags } from "../../redux/actions/HashtagsAction";
import { setFilterExplore } from "../../redux/slices/FilterSlice";
import { getPosts } from "../../redux/actions/PostActions";

const HashtagCardList = () => {
  const dispatch = useDispatch();
  const hashtags = useSelector((state) => state.hashtags);
const filterExplorer=useSelector((state)=>state.filterPosts.filterExplore);
  useEffect(() => { 
   dispatch(getHashtags(5));
   dispatch(setFilterExplore(""));
   dispatch(getPosts({userId:filterExplorer}))
  }, []);

  return (
    <>
      {hashtags
        .map((hashtag, index) => (
          <div key={index} className="hashtag" >
            <Card
              sx={{
                backgroundColor: "transparent",
                width: "100%",
                maxHeight: "100%",
              }}
              onClick={()=>dispatch(setFilterExplore(hashtag.name))}
            >
              <CardActionArea >
                <CardContent>
                  <Typography gutterBottom component="div">

                    {hashtag.name}
                  </Typography>
                  <Typography variant="body2" color="gray" >
                    {hashtag.postCount}
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
