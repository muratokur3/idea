import { useDispatch, useSelector } from "react-redux";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { setFilterExplore } from "../../redux/slices/FilterSlice";

const HashtagCardList = () => {
  const dispatch = useDispatch();
  const hashtags = useSelector((state) => state.hashtags);
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
        )).reverse().slice(0,5)}
    </>
  );
};

export default HashtagCardList;
