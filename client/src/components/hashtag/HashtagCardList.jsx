import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardHeader, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHashtagsExplore } from "../../redux/actions/HashtagsAction";

const HashtagCardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginedUser = useSelector((state) => state.authentication.user);
  const profileData = useSelector((state) => state.profile);
  const hashtagsExplore = useSelector(
    (state) => state.hashtags.hashtagsExplore
  );

  const handleFollowHashtag = (hashtagName) => {
    if (loginedUser._id) {
      new Set(profileData.user.hashtags).has(hashtagName)
        ? alert("Takip et")
        : alert("Takibi bırak");
    } else {
      alert("Lütfen giriş yapınız");
    }
  };

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
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(66, 62, 62, 0.522)",
                    borderRadius: "5px",
                    padding: "3px",
                    fontSize: "10px",
                    fontFamily: "monospace",
                  }}
                  onClick={() => handleFollowHashtag(hashtag.name)}
                >
                  {new Set(profileData.user.hashtags).has(hashtag.name)
                    ? "çıkar"
                    : "Ekle"}
                </Button>
              }
            ></CardHeader>
          </Card>
        </div>
      ))}
    </>
  );
};

export default HashtagCardList;
