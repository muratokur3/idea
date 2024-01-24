import { useDispatch, useSelector } from "react-redux";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { setFilterExplore } from "../../redux/slices/FilterSlice";
import { useNavigate } from "react-router-dom";

const HashtagCardList = () => {
  const dispatch = useDispatch();
  const hashtags = useSelector((state) => state.hashtags);
  const filterExplore = useSelector((state) => state.filterPosts.filterExplore);
  const navigate=useNavigate();
  useEffect(() => { 
   dispatch(setFilterExplore(""));
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
        )).reverse().slice(0,5)}
    </>
  );
};

export default HashtagCardList;
