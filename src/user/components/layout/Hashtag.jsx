import { useSelector } from "react-redux";
import "./scss/hashtag.scss";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
const Hashtag = () => {
  const hashtags = useSelector((state) => state.hashtags);

  return (
    <div id="hashtag-container">
      {hashtags
        .map((hashtag, index) => (
          <div className="hashtag" key={hashtag}>
            <Card
              sx={{
                backgroundColor: "transparent",
                width: "100%",
                maxHeight: "100%",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom component="div">
                    {hashtag}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {(index + 3) * 30}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))
        .slice(0, 10)}
    </div>
  );
};
export default Hashtag;
